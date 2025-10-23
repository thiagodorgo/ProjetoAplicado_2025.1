#!/usr/bin/env python3
"""
TechSolutions Backend API Testing Suite
Testing all critical endpoints for the course management system
"""

import requests
import json
import sys
from datetime import datetime, timezone
from typing import Dict, Any, Optional

# Configuration
BASE_URL = "http://localhost:8001"
API_BASE = f"{BASE_URL}/api"

class TechSolutionsAPITester:
    def __init__(self):
        self.session = requests.Session()
        self.auth_token = None
        self.test_results = []
        self.test_user_id = None
        
    def log_test(self, test_name: str, success: bool, details: str = "", response_data: Any = None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        if response_data:
            result["response"] = response_data
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {details}")
        
    def test_backend_availability(self):
        """Test if backend service is responding"""
        try:
            # Test FastAPI docs endpoint
            response = self.session.get(f"{BASE_URL}/docs", timeout=10)
            if response.status_code == 200:
                self.log_test("Backend Service", True, "FastAPI docs accessible")
                return True
            else:
                self.log_test("Backend Service", False, f"Docs returned {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Backend Service", False, f"Connection failed: {str(e)}")
            return False
    
    def test_openapi_spec(self):
        """Test OpenAPI specification endpoint"""
        try:
            response = self.session.get(f"{BASE_URL}/openapi.json", timeout=10)
            if response.status_code == 200:
                spec = response.json()
                endpoints = len(spec.get("paths", {}))
                self.log_test("OpenAPI Spec", True, f"Available with {endpoints} endpoints")
                return True
            else:
                self.log_test("OpenAPI Spec", False, f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("OpenAPI Spec", False, f"Error: {str(e)}")
            return False
    
    def test_api_root_endpoint(self):
        """Test API root endpoint"""
        endpoints_to_try = [
            f"{API_BASE}/",
            f"{API_BASE}",
            f"{BASE_URL}/",
            f"{BASE_URL}"
        ]
        
        for endpoint in endpoints_to_try:
            try:
                response = self.session.get(endpoint, timeout=10)
                if response.status_code == 200:
                    data = response.json()
                    self.log_test("API Root Endpoint", True, f"Accessible at {endpoint}", data)
                    return True
                elif response.status_code == 404:
                    continue
                else:
                    self.log_test("API Root Endpoint", False, f"{endpoint} returned {response.status_code}")
            except Exception as e:
                continue
        
        self.log_test("API Root Endpoint", False, "No working root endpoint found")
        return False
    
    def create_test_dependencies(self):
        """Create test data dependencies (area, cargo, perfil)"""
        if not self.auth_token:
            return False
            
        headers = {"Authorization": f"Bearer {self.auth_token}"}
        
        try:
            # Create test area
            area_data = {
                "nome": "Área de Testes",
                "departamento": "TI",
                "localizacao": "Sede Principal"
            }
            response = self.session.post(f"{API_BASE}/areas", json=area_data, headers=headers)
            if response.status_code == 200:
                self.test_area_id = response.json()["id_area"]
            else:
                # Try to get existing areas
                response = self.session.get(f"{API_BASE}/areas", headers=headers)
                if response.status_code == 200 and response.json():
                    self.test_area_id = response.json()[0]["id_area"]
                else:
                    self.test_area_id = 1  # Default fallback
            
            # Create test cargo
            cargo_data = {
                "nome": "Operador Rural",
                "descricao": "Trabalhador rural geral",
                "requer_nr31": True
            }
            response = self.session.post(f"{API_BASE}/cargos", json=cargo_data, headers=headers)
            if response.status_code == 200:
                self.test_cargo_id = response.json()["id_cargo"]
            else:
                # Try to get existing cargos
                response = self.session.get(f"{API_BASE}/cargos", headers=headers)
                if response.status_code == 200 and response.json():
                    self.test_cargo_id = response.json()[0]["id_cargo"]
                else:
                    self.test_cargo_id = 1  # Default fallback
            
            # Create test perfil
            perfil_data = {
                "nome": "Colaborador",
                "permissoes": ["read", "write"]
            }
            response = self.session.post(f"{API_BASE}/perfis", json=perfil_data, headers=headers)
            if response.status_code == 200:
                self.test_perfil_id = response.json()["id_perfil"]
            else:
                # Try to get existing perfis
                response = self.session.get(f"{API_BASE}/perfis", headers=headers)
                if response.status_code == 200 and response.json():
                    self.test_perfil_id = response.json()[0]["id_perfil"]
                else:
                    self.test_perfil_id = 1  # Default fallback
            
            return True
            
        except Exception as e:
            self.log_test("Test Dependencies", False, f"Error creating dependencies: {str(e)}")
            return False
    
    def test_authentication_register(self):
        """Test user registration"""
        try:
            # First create dependencies
            if not hasattr(self, 'test_area_id'):
                self.test_area_id = 1
                self.test_cargo_id = 1
                self.test_perfil_id = 1
            
            user_data = {
                "nome": "João Silva",
                "email": "joao.silva@techsolutions.com.br",
                "cpf": "12345678901",
                "senha": "senha123",
                "id_cargo": self.test_cargo_id,
                "id_area": self.test_area_id,
                "id_perfil": self.test_perfil_id,
                "ativo": True
            }
            
            response = self.session.post(f"{API_BASE}/auth/register", json=user_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                self.test_user_id = data.get("id_colaborador")
                self.log_test("User Registration", True, f"User created with ID: {self.test_user_id}", data)
                return True
            elif response.status_code == 400 and "já cadastrado" in response.text:
                self.log_test("User Registration", True, "User already exists (expected)")
                return True
            else:
                self.log_test("User Registration", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("User Registration", False, f"Error: {str(e)}")
            return False
    
    def test_authentication_login(self):
        """Test user login and JWT token generation"""
        try:
            login_data = {
                "email": "joao.silva@techsolutions.com.br",
                "senha": "senha123"
            }
            
            response = self.session.post(f"{API_BASE}/auth/login", json=login_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                self.auth_token = data.get("access_token")
                colaborador = data.get("colaborador", {})
                self.test_user_id = colaborador.get("id_colaborador")
                
                self.log_test("User Login", True, f"Login successful, token received", {
                    "token_type": data.get("token_type"),
                    "colaborador_id": self.test_user_id,
                    "colaborador_nome": colaborador.get("nome")
                })
                return True
            else:
                self.log_test("User Login", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("User Login", False, f"Error: {str(e)}")
            return False
    
    def test_colaboradores_endpoints(self):
        """Test colaboradores CRUD operations"""
        if not self.auth_token:
            self.log_test("Colaboradores Endpoints", False, "No auth token available")
            return False
            
        headers = {"Authorization": f"Bearer {self.auth_token}"}
        
        try:
            # Test GET /api/colaboradores
            response = self.session.get(f"{API_BASE}/colaboradores", headers=headers, timeout=10)
            if response.status_code == 200:
                colaboradores = response.json()
                self.log_test("GET Colaboradores", True, f"Retrieved {len(colaboradores)} colaboradores")
            else:
                self.log_test("GET Colaboradores", False, f"Status: {response.status_code}")
                return False
            
            # Test GET specific colaborador if we have one
            if self.test_user_id:
                response = self.session.get(f"{API_BASE}/colaboradores/{self.test_user_id}", headers=headers, timeout=10)
                if response.status_code == 200:
                    colaborador = response.json()
                    self.log_test("GET Colaborador by ID", True, f"Retrieved colaborador: {colaborador.get('nome')}")
                else:
                    self.log_test("GET Colaborador by ID", False, f"Status: {response.status_code}")
            
            return True
            
        except Exception as e:
            self.log_test("Colaboradores Endpoints", False, f"Error: {str(e)}")
            return False
    
    def test_cursos_endpoints(self):
        """Test cursos CRUD operations"""
        if not self.auth_token:
            self.log_test("Cursos Endpoints", False, "No auth token available")
            return False
            
        headers = {"Authorization": f"Bearer {self.auth_token}"}
        
        try:
            # Test GET /api/cursos
            response = self.session.get(f"{API_BASE}/cursos", headers=headers, timeout=10)
            if response.status_code == 200:
                cursos = response.json()
                self.log_test("GET Cursos", True, f"Retrieved {len(cursos)} cursos")
            else:
                self.log_test("GET Cursos", False, f"Status: {response.status_code}")
                return False
            
            # Test POST /api/cursos - Create new course
            curso_data = {
                "titulo": "Treinamento NR-31 - Segurança no Trabalho Rural",
                "descricao": "Curso obrigatório sobre segurança e saúde no trabalho na agricultura",
                "carga_horaria": 20,
                "modalidade": "presencial",
                "tipo_treinamento": "nr31",
                "norma_referencia": "NR-31",
                "publico_alvo": "Trabalhadores rurais",
                "instrutores": "João Instrutor",
                "permite_auto_inscricao": True
            }
            
            response = self.session.post(f"{API_BASE}/cursos", json=curso_data, headers=headers, timeout=10)
            if response.status_code == 200:
                curso = response.json()
                curso_id = curso.get("id_curso")
                self.log_test("POST Curso", True, f"Created curso with ID: {curso_id}")
                
                # Test GET specific curso
                response = self.session.get(f"{API_BASE}/cursos/{curso_id}", headers=headers, timeout=10)
                if response.status_code == 200:
                    self.log_test("GET Curso by ID", True, f"Retrieved curso: {curso.get('titulo')}")
                else:
                    self.log_test("GET Curso by ID", False, f"Status: {response.status_code}")
                    
            else:
                self.log_test("POST Curso", False, f"Status: {response.status_code}, Response: {response.text}")
            
            return True
            
        except Exception as e:
            self.log_test("Cursos Endpoints", False, f"Error: {str(e)}")
            return False
    
    def test_trilhas_endpoints(self):
        """Test trilhas CRUD operations"""
        if not self.auth_token:
            self.log_test("Trilhas Endpoints", False, "No auth token available")
            return False
            
        headers = {"Authorization": f"Bearer {self.auth_token}"}
        
        try:
            # Test GET /api/trilhas
            response = self.session.get(f"{API_BASE}/trilhas", headers=headers, timeout=10)
            if response.status_code == 200:
                trilhas = response.json()
                self.log_test("GET Trilhas", True, f"Retrieved {len(trilhas)} trilhas")
            else:
                self.log_test("GET Trilhas", False, f"Status: {response.status_code}")
                return False
            
            # Test POST /api/trilhas - Create new learning path
            trilha_data = {
                "titulo": "Trilha de Segurança Rural Completa",
                "descricao": "Trilha completa de treinamentos obrigatórios para trabalhadores rurais",
                "obrigatoria": True,
                "tags": []
            }
            
            response = self.session.post(f"{API_BASE}/trilhas", json=trilha_data, headers=headers, timeout=10)
            if response.status_code == 200:
                trilha = response.json()
                trilha_id = trilha.get("id_trilha")
                self.log_test("POST Trilha", True, f"Created trilha with ID: {trilha_id}")
            else:
                self.log_test("POST Trilha", False, f"Status: {response.status_code}, Response: {response.text}")
            
            return True
            
        except Exception as e:
            self.log_test("Trilhas Endpoints", False, f"Error: {str(e)}")
            return False
    
    def test_dashboard_stats(self):
        """Test dashboard statistics endpoint"""
        if not self.auth_token:
            self.log_test("Dashboard Stats", False, "No auth token available")
            return False
            
        headers = {"Authorization": f"Bearer {self.auth_token}"}
        
        try:
            response = self.session.get(f"{API_BASE}/dashboard/stats", headers=headers, timeout=10)
            if response.status_code == 200:
                stats = response.json()
                self.log_test("Dashboard Stats", True, f"Retrieved stats", stats)
                return True
            else:
                self.log_test("Dashboard Stats", False, f"Status: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Dashboard Stats", False, f"Error: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all tests in sequence"""
        print("🚀 Starting TechSolutions Backend API Tests")
        print("=" * 60)
        
        # Basic connectivity tests
        if not self.test_backend_availability():
            print("❌ Backend service not available - stopping tests")
            return False
        
        self.test_openapi_spec()
        self.test_api_root_endpoint()
        
        # Authentication tests
        self.test_authentication_register()
        if not self.test_authentication_login():
            print("❌ Authentication failed - skipping authenticated tests")
            return False
        
        # Create test dependencies
        self.create_test_dependencies()
        
        # CRUD tests
        self.test_colaboradores_endpoints()
        self.test_cursos_endpoints()
        self.test_trilhas_endpoints()
        self.test_dashboard_stats()
        
        return True
    
    def print_summary(self):
        """Print test summary"""
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests*100):.1f}%")
        
        if failed_tests > 0:
            print("\n🔍 FAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"  ❌ {result['test']}: {result['details']}")
        
        print("\n" + "=" * 60)
        
        return failed_tests == 0

def main():
    """Main test execution"""
    tester = TechSolutionsAPITester()
    
    try:
        success = tester.run_all_tests()
        tester.print_summary()
        
        # Save detailed results to file
        with open("/app/test_results_detailed.json", "w") as f:
            json.dump(tester.test_results, f, indent=2, default=str)
        
        return 0 if success else 1
        
    except KeyboardInterrupt:
        print("\n⚠️ Tests interrupted by user")
        return 1
    except Exception as e:
        print(f"\n💥 Unexpected error: {str(e)}")
        return 1

if __name__ == "__main__":
    sys.exit(main())