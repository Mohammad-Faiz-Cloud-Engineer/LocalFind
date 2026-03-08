#!/bin/bash

# LocalFind - Comprehensive Test Suite Runner
# Runs all production-grade tests

echo "🚀 LocalFind - Production Test Suite"
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

FAILED=0

# Function to run a test
run_test() {
    local test_name=$1
    local test_file=$2
    
    echo ""
    echo "▶️  Running: $test_name"
    echo "----------------------------------------"
    
    if node "$test_file"; then
        echo -e "${GREEN}✅ $test_name PASSED${NC}"
    else
        echo -e "${RED}❌ $test_name FAILED${NC}"
        FAILED=$((FAILED + 1))
    fi
    
    echo ""
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js to run tests.${NC}"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Run all tests
run_test "Security Tests" "tests/security.test.js"
run_test "Accessibility Tests" "tests/accessibility.test.js"
run_test "CSP Validation" "tests/csp-validator.js"
run_test "Code Quality Tests" "tests/code-quality.test.js"

# Final results
echo "======================================"
echo "📊 FINAL TEST RESULTS"
echo "======================================"

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 ALL TESTS PASSED!${NC}"
    echo ""
    echo "✅ Security: PASS"
    echo "✅ Accessibility: PASS"
    echo "✅ CSP Configuration: PASS"
    echo "✅ Code Quality: PASS"
    echo ""
    echo -e "${GREEN}🚀 Codebase is PRODUCTION READY!${NC}"
    exit 0
else
    echo -e "${RED}❌ $FAILED TEST SUITE(S) FAILED${NC}"
    echo ""
    echo "Please review the test output above and fix the issues."
    exit 1
fi
