#!/bin/bash

# AtlasAI - Railway Deployment Script
# One-click deployment to Railway with full automation

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BACKEND_FILE="atlasai-enhanced-backend.js"
APP_NAME="atlasai-backend"

# Print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_header() {
    echo -e "${BLUE}🚀 $1${NC}"
    echo "======================================"
}

# Check prerequisites
check_prerequisites() {
    print_header "Checking Prerequisites"
    
    # Check if Railway CLI is installed
    if ! command -v railway &> /dev/null; then
        print_warning "Railway CLI not found. Installing..."
        npm install -g @railway/cli
        print_status "Railway CLI installed"
    else
        print_status "Railway CLI found"
    fi
    
    # Check if files exist
    if [ ! -f "$BACKEND_FILE" ]; then
        print_error "Backend file $BACKEND_FILE not found!"
        exit 1
    else
        print_status "Backend file found: $BACKEND_FILE"
    fi
    
    # Check if package.json exists
    if [ ! -f "package.json" ]; then
        print_warning "Creating package.json..."
        cat > package.json << EOF
{
  "name": "atlasai-backend",
  "version": "1.0.0",
  "main": "$BACKEND_FILE",
  "scripts": {
    "start": "node $BACKEND_FILE",
    "test": "node simple-test.js",
    "demo": "node demo-enhanced-features.js"
  },
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "axios": "^1.6.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
EOF
        print_status "package.json created"
    else
        print_status "package.json found"
    fi
}

# Setup environment
setup_environment() {
    print_header "Setting Up Environment"
    
    # Load existing .env if available
    if [ -f ".env" ]; then
        print_info "Loading existing .env file..."
        source .env
        print_status "Environment loaded"
    else
        print_warning ".env file not found. Creating from template..."
        if [ -f ".env.template" ]; then
            cp .env.template .env
            print_info "Please edit .env file with your API keys before continuing"
            print_info "Press Enter when ready to continue..."
            read
        else
            print_warning "No .env.template found. Creating basic .env..."
            cat > .env << EOF
NODE_ENV=production
PORT=3000
JWT_SECRET=$(openssl rand -base64 32)
USE_MOCK_SERVICES=false
EOF
        fi
        print_status ".env file created"
    fi
}

# Railway authentication
railway_auth() {
    print_header "Railway Authentication"
    
    if [ -z "$RAILWAY_TOKEN" ]; then
        print_info "No Railway token found. Please login to Railway..."
        railway login
        if [ $? -eq 0 ]; then
            print_status "Railway login successful"
        else
            print_error "Railway login failed"
            exit 1
        fi
    else
        print_status "Railway token found"
    fi
}

# Create Railway project
create_project() {
    print_header "Creating Railway Project"
    
    # Check if project already exists
    if railway status &> /dev/null; then
        print_info "Railway project already initialized"
        return
    fi
    
    print_info "Initializing new Railway project..."
    railway init
    print_status "Railway project created"
}

# Set environment variables
set_environment_variables() {
    print_header "Setting Environment Variables"
    
    # Essential environment variables
    env_vars=(
        "NODE_ENV=production"
        "PORT=3000"
        "JWT_SECRET=${JWT_SECRET:-$(openssl rand -base64 32)}"
    )
    
    for var in "${env_vars[@]}"; do
        key="${var%%=*}"
        value="${var#*=}"
        print_info "Setting $key..."
        railway variables set "$key=$value"
    done
    
    # Optional environment variables from .env
    if [ -f ".env" ]; then
        while IFS= read -r line; do
            # Skip comments and empty lines
            if [[ $line =~ ^[[:space:]]*# ]] || [[ -z "${line// }" ]]; then
                continue
            fi
            
            # Extract key-value pairs
            if [[ $line =~ ^([^=]+)=(.*)$ ]]; then
                key="${BASH_REMATCH[1]}"
                value="${BASH_REMATCH[2]}"
                
                # Skip already set variables
                if [[ ! " ${env_vars[@]} " =~ " $key=" ]]; then
                    print_info "Setting $key from .env..."
                    railway variables set "$key=$value"
                fi
            fi
        done < .env
    fi
    
    print_status "Environment variables configured"
}

# Deploy to Railway
deploy_to_railway() {
    print_header "Deploying to Railway"
    
    print_info "Deploying AtlasAI backend..."
    railway up
    
    if [ $? -eq 0 ]; then
        print_status "Deployment successful!"
        
        # Get deployment URL
        DEPLOY_URL=$(railway status --json 2>/dev/null | grep -o '"url":"[^"]*' | cut -d'"' -f4 || echo "Unknown")
        if [ "$DEPLOY_URL" != "Unknown" ]; then
            print_status "Backend deployed at: $DEPLOY_URL"
            echo "$DEPLOY_URL" > deployment-url.txt
        fi
    else
        print_error "Deployment failed!"
        exit 1
    fi
}

# Test deployment
test_deployment() {
    print_header "Testing Deployment"
    
    # Get the deployment URL
    DEPLOY_URL=$(cat deployment-url.txt 2>/dev/null || echo "")
    
    if [ -z "$DEPLOY_URL" ]; then
        print_warning "Could not get deployment URL. Checking Railway status..."
        railway status
        return
    fi
    
    # Test health endpoint
    print_info "Testing health endpoint..."
    sleep 10  # Give deployment some time to start
    
    if curl -f -s "$DEPLOY_URL/api/health" > /dev/null; then
        print_status "Health check passed!"
    else
        print_warning "Health check failed. This is normal during initial deployment."
        print_info "Please wait a few minutes and check manually."
    fi
    
    # Test statistics endpoint
    print_info "Testing statistics endpoint..."
    if curl -f -s "$DEPLOY_URL/api/stats" > /dev/null; then
        print_status "Statistics endpoint working!"
    else
        print_warning "Statistics endpoint not responding yet."
    fi
}

# Get deployment info
show_deployment_info() {
    print_header "Deployment Information"
    
    print_status "🎉 AtlasAI Backend deployed successfully!"
    echo ""
    
    if [ -f "deployment-url.txt" ]; then
        DEPLOY_URL=$(cat deployment-url.txt)
        print_info "Backend URL: $DEPLOY_URL"
        print_info "Health Check: $DEPLOY_URL/api/health"
        print_info "Statistics: $DEPLOY_URL/api/stats"
        print_info "Dashboard: $DEPLOY_URL/"
    fi
    
    echo ""
    print_info "Next steps:"
    echo "1. Deploy frontend to Vercel/Netlify"
    echo "2. Update API_BASE in script-enhanced.js to: $DEPLOY_URL/api"
    echo "3. Configure real API keys if needed"
    echo "4. Test all endpoints"
    
    echo ""
    print_info "Useful commands:"
    echo "• railway status          - Check deployment status"
    echo "• railway logs            - View application logs"
    echo "• railway variables       - Manage environment variables"
    echo "• railway domain          - Get current domain"
    echo "• railway --help          - Show all commands"
}

# Main execution
main() {
    clear
    echo -e "${BLUE}"
    echo "  ██████╗ ██████╗ ██████╗ ██████╗  ██████╗ ██████╗ ██╗  ██╗"
    echo " ██╔════╝██╔═══██╗██╔══██╗██╔══██╗██╔═══██╗██╔══██╗╚██╗██╔╝"
    echo " ██║     ██║   ██║██████╔╝██████╔╝██║   ██║██████╔╝ ╚███╔╝ "
    echo " ██║     ██║   ██║██╔══██╗██╔══██╗██║   ██║██╔══██╗ ██╔██╗ "
    echo " ╚██████╗╚██████╔╝██║  ██║██║  ██║╚██████╔╝██║  ██║██╔╝ ██╗"
    echo "  ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝"
    echo ""
    echo -e "${NC}"
    print_header "Railway Deployment Script"
    
    check_prerequisites
    setup_environment
    railway_auth
    create_project
    set_environment_variables
    deploy_to_railway
    test_deployment
    show_deployment_info
    
    print_status "🎉 Deployment complete! Happy coding!"
}

# Run main function
main "$@"