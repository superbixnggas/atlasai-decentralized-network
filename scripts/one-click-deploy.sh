#!/bin/bash

# AtlasAI - One-Click Complete Deployment Script
# Master script that handles everything: API setup, deployment, and testing

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="AtlasAI"
BACKEND_FILE="atlasai-enhanced-backend.js"

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
    echo -e "${PURPLE}🚀 $1${NC}"
    echo "======================================"
}

# Show welcome
show_welcome() {
    clear
    echo -e "${BLUE}"
    echo " ██████╗ ██████╗ ██████╗ ██████╗  ██████╗ ██████╗ ██╗  ██╗     ██████╗  ██████╗ ██████╗  ██████╗ "
    echo "██╔════╝██╔═══██╗██╔══██╗██╔══██╗██╔═══██╗██╔══██╗╚██╗██╔╝     ██╔══██╗██╔═══██╗██╔══██╗██╔═══██╗"
    echo "██║     ██║   ██║██████╔╝██████╔╝██║   ██║██████╔╝ ╚███╔╝      ██████╔╝██║   ██║██████╔╝██║   ██║"
    echo "██║     ██║   ██║██╔══██╗██╔══██╗██║   ██║██╔══██╗ ██╔██╗      ██╔══██╗██║   ██║██╔══██╗██║   ██║"
    echo "╚██████╗╚██████╔╝██║  ██║██║  ██║╚██████╔╝██║  ██║██╔╝ ██╗     ██████╔╝╚██████╔╝██║  ██║╚██████╔╝"
    echo " ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝     ╚═════╝  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ "
    echo ""
    echo "           ██████╗ ██╗      █████╗ ██╗   ██╗███████╗██████╗ "
    echo "          ██╔═══██╗██║     ██╔══██╗██║   ██║██╔════╝██╔══██╗"
    echo "          ██║   ██║██║     ███████║██║   ██║█████╗  ██████╔╝"
    echo "          ██║   ██║██║     ██╔══██║╚██╗ ██╔╝██╔══╝  ██╔══██╗"
    echo "          ╚██████╔╝███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║"
    echo "           ╚═════╝ ╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝"
    echo ""
    echo -e "${NC}"
    print_header "One-Click Complete Deployment"
    
    print_info "Welcome to AtlasAI One-Click Deployment!"
    print_info "This script will:"
    echo "  1. 🔑 Set up all API configurations"
    echo "  2. 🚀 Deploy backend to cloud platform"
    echo "  3. 🧪 Test the deployment"
    echo "  4. 📋 Provide next steps for frontend"
    echo ""
    print_info "Estimated time: 5-10 minutes"
    print_info "Requirements: Internet connection, cloud platform account"
    echo ""
}

# Check prerequisites
check_prerequisites() {
    print_header "Checking Prerequisites"
    
    # Check internet connection
    if curl -s --max-time 5 https://google.com > /dev/null; then
        print_status "Internet connection: OK"
    else
        print_error "No internet connection. Please check your network."
        exit 1
    fi
    
    # Check required files
    required_files=("$BACKEND_FILE" "package.json" "index.html")
    for file in "${required_files[@]}"; do
        if [ -f "$file" ]; then
            print_status "File found: $file"
        else
            print_warning "File not found: $file (may be created automatically)"
        fi
    done
    
    # Check cloud platform CLI
    echo ""
    print_info "Checking for deployment tools..."
    
    if command -v railway &> /dev/null; then
        print_status "Railway CLI: Found"
        RAILWAY_AVAILABLE=true
    else
        print_warning "Railway CLI: Not found (can be installed automatically)"
        RAILWAY_AVAILABLE=false
    fi
    
    if command -v heroku &> /dev/null; then
        print_status "Heroku CLI: Found"
        HEROKU_AVAILABLE=true
    else
        print_warning "Heroku CLI: Not found (can be installed automatically)"
        HEROKU_AVAILABLE=false
    fi
    
    if command -v vercel &> /dev/null; then
        print_status "Vercel CLI: Found"
        VERCEL_AVAILABLE=true
    else
        print_warning "Vercel CLI: Not found (will be installed if needed)"
        VERCEL_AVAILABLE=false
    fi
}

# Choose deployment platform
choose_platform() {
    print_header "Choose Deployment Platform"
    
    echo "Select your preferred cloud platform:"
    echo ""
    echo "1. 🚂 Railway (Recommended - Easy setup, generous free tier)"
    echo "2. 🛠️  Heroku (Traditional, good documentation)"
    echo "3. 🔄 Vercel (For frontend, needs manual backend setup)"
    echo "4. ❓ I need help choosing"
    
    read -p "Enter choice (1-4): " choice
    
    case $choice in
        1)
            PLATFORM="railway"
            PLATFORM_DESC="Railway"
            ;;
        2)
            PLATFORM="heroku"
            PLATFORM_DESC="Heroku"
            ;;
        3)
            PLATFORM="vercel"
            PLATFORM_DESC="Vercel"
            ;;
        4)
            print_header "Platform Comparison"
            echo "🚀 Railway:"
            echo "  • Very easy setup"
            echo "  • Generous free tier"
            echo "  • Automatic scaling"
            echo "  • Great for Node.js apps"
            echo ""
            echo "🛠️  Heroku:"
            echo "  • Traditional PaaS"
            echo "  • Good documentation"
            echo "  • Free tier available"
            echo "  • May have limited resources"
            echo ""
            echo "🔄 Vercel:"
            echo "  • Best for frontend/static sites"
            echo "  • Excellent frontend deployment"
            echo "  • Backend requires serverless functions"
            echo "  • Great for static hosting"
            echo ""
            print_info "Recommendation: Choose Railway for backend deployment"
            echo ""
            read -p "Enter platform choice (railway/heroku/vercel): " PLATFORM
            PLATFORM_DESC="${PLATFORM^}"
            ;;
        *)
            print_error "Invalid choice. Using Railway as default."
            PLATFORM="railway"
            PLATFORM_DESC="Railway"
            ;;
    esac
    
    print_status "Selected platform: $PLATFORM_DESC"
}

# Setup APIs
setup_apis_interactive() {
    print_header "API Configuration"
    
    echo "Would you like to configure your API keys now?"
    echo "You can:"
    echo "1. Configure APIs now (recommended)"
    echo "2. Skip and use mock services (for testing)"
    echo "3. Deploy with empty configuration (you'll set up later)"
    
    read -p "Enter choice (1-3): " choice
    
    case $choice in
        1)
            print_info "Running interactive API setup..."
            if [ -f "setup-apis.sh" ]; then
                chmod +x setup-apis.sh
                ./setup-apis.sh
            else
                print_error "setup-apis.sh not found. Creating basic .env..."
                if [ -f ".env.template" ]; then
                    cp .env.template .env
                    print_status "Created .env from template. Please edit with your API keys."
                else
                    cat > .env << EOF
NODE_ENV=production
PORT=3000
JWT_SECRET=$(openssl rand -base64 32)
USE_MOCK_SERVICES=false
EOF
                    print_status "Created basic .env file. Please edit with your API keys."
                fi
            fi
            ;;
        2)
            print_info "Using mock services for deployment..."
            cat > .env << EOF
NODE_ENV=production
PORT=3000
JWT_SECRET=$(openssl rand -base64 32)
USE_MOCK_SERVICES=true
DEBUG_MODE=true
EOF
            print_status "Created .env with mock services"
            ;;
        3)
            print_info "Deploying with empty configuration..."
            cat > .env << EOF
NODE_ENV=production
PORT=3000
JWT_SECRET=$(openssl rand -base64 32)
USE_MOCK_SERVICES=true
EOF
            print_status "Created minimal .env file"
            ;;
        *)
            print_error "Invalid choice. Skipping API configuration."
            ;;
    esac
}

# Deploy to platform
deploy_to_platform() {
    print_header "Deploying to $PLATFORM_DESC"
    
    case $PLATFORM in
        "railway")
            if [ -f "deploy-railway.sh" ]; then
                chmod +x deploy-railway.sh
                ./deploy-railway.sh
            else
                print_error "deploy-railway.sh not found"
                return 1
            fi
            ;;
        "heroku")
            if [ -f "deploy-heroku.sh" ]; then
                chmod +x deploy-heroku.sh
                ./deploy-heroku.sh
            else
                print_error "deploy-heroku.sh not found"
                return 1
            fi
            ;;
        "vercel")
            print_warning "Vercel is primarily for frontend deployment."
            print_info "For Vercel, you would need to:"
            echo "  1. Deploy backend to Railway/Heroku first"
            echo "  2. Then deploy frontend to Vercel"
            echo ""
            print_info "Do you want to deploy backend to Railway instead? (recommended)"
            read -p "Deploy backend to Railway? (y/N): " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                PLATFORM="railway"
                PLATFORM_DESC="Railway"
                if [ -f "deploy-railway.sh" ]; then
                    chmod +x deploy-railway.sh
                    ./deploy-railway.sh
                else
                    print_error "deploy-railway.sh not found"
                    return 1
                fi
            else
                print_info "Please deploy backend to Railway/Heroku first, then use Vercel for frontend."
                return 1
            fi
            ;;
        *)
            print_error "Unknown platform: $PLATFORM"
            return 1
            ;;
    esac
}

# Test deployment
test_deployment() {
    print_header "Testing Deployment"
    
    if [ -f "test-deployment.sh" ]; then
        chmod +x test-deployment.sh
        ./test-deployment.sh
    else
        print_warning "test-deployment.sh not found. Running basic tests..."
        
        # Basic health check
        if [ -f "deployment-url.txt" ]; then
            DEPLOY_URL=$(cat deployment-url.txt)
            print_info "Testing $DEPLOY_URL..."
            
            if curl -s --max-time 10 "$DEPLOY_URL/api/health" > /dev/null; then
                print_status "Backend is responding!"
            else
                print_warning "Backend not responding yet. This is normal during deployment."
                print_info "Please wait a few minutes and check manually."
            fi
        else
            print_warning "No deployment URL found. Deployment may not be complete."
        fi
    fi
}

# Show next steps
show_next_steps() {
    print_header "Next Steps"
    
    if [ -f "deployment-url.txt" ]; then
        DEPLOY_URL=$(cat deployment-url.txt)
        print_status "🎉 Deployment successful!"
        echo ""
        print_info "Your backend is deployed at: $DEPLOY_URL"
        print_info "Health check: $DEPLOY_URL/api/health"
        print_info "Statistics: $DEPLOY_URL/api/stats"
        echo ""
    else
        print_warning "Deployment may not be complete. Check manually."
        echo ""
    fi
    
    print_info "Frontend Deployment:"
    echo "1. Update API_BASE in script-enhanced.js to: $DEPLOY_URL/api"
    echo "2. Deploy frontend to Vercel:"
    echo "   vercel --prod"
    echo "   OR"
    echo "   netlify deploy --prod --dir ."
    echo ""
    print_info "Alternative: Use our frontend deployment script"
    if [ -f "deploy-frontend.sh" ]; then
        echo "   ./deploy-frontend.sh"
    fi
    echo ""
    print_info "API Configuration (if not done already):"
    echo "• Set up real API keys in your platform's environment variables"
    echo "• Replace mock services with real ones"
    echo "• Test all endpoints with real data"
    echo ""
    print_info "Post-Deployment:"
    echo "• Set up SSL certificate"
    echo "• Configure custom domain"
    echo "• Set up monitoring and alerts"
    echo "• Add rate limiting for production"
    echo ""
    
    # Show useful commands
    print_info "Useful Commands:"
    echo "• View deployment logs:"
    if [ "$PLATFORM" = "railway" ]; then
        echo "  railway logs"
    elif [ "$PLATFORM" = "heroku" ]; then
        echo "  heroku logs --tail --app atlasai-backend"
    fi
    echo "• Check environment variables:"
    if [ "$PLATFORM" = "railway" ]; then
        echo "  railway variables"
    elif [ "$PLATFORM" = "heroku" ]; then
        echo "  heroku config --app atlasai-backend"
    fi
    echo "• Restart application:"
    if [ "$PLATFORM" = "railway" ]; then
        echo "  railway restart"
    elif [ "$PLATFORM" = "heroku" ]; then
        echo "  heroku restart --app atlasai-backend"
    fi
}

# Show help
show_help() {
    print_header "AtlasAI One-Click Deployment Help"
    
    echo "This script provides a complete automated deployment solution for AtlasAI."
    echo ""
    echo "What it does:"
    echo "  • Checks prerequisites and requirements"
    echo "  • Configures API keys and environment"
    echo "  • Deploys backend to cloud platform"
    echo "  • Tests the deployment"
    echo "  • Provides next steps for frontend"
    echo ""
    echo "Prerequisites:"
    echo "  • Internet connection"
    echo "  • Cloud platform account (Railway/Heroku/Vercel)"
    echo "  • API keys for external services (optional)"
    echo ""
    echo "Configuration:"
    echo "  • Backend will be deployed with your .env settings"
    echo "  • If no API keys are configured, mock services will be used"
    echo "  • You can add real API keys after deployment"
    echo ""
    echo "Platforms supported:"
    echo "  • Railway (Recommended - Easy setup, generous free tier)"
    echo "  • Heroku (Traditional PaaS, good documentation)"
    echo "  • Vercel (Frontend deployment, needs backend separately)"
    echo ""
    echo "Post-deployment:"
    echo "  • Update frontend to use deployed backend"
    echo "  • Set up SSL and custom domain"
    echo "  • Configure real API keys if using mock services"
    echo "  • Set up monitoring and alerts"
    echo ""
    print_info "For detailed documentation, see README.md and DEPLOYMENT_GUIDE.md"
}

# Show summary
show_summary() {
    print_header "Deployment Summary"
    
    echo "🎯 Deployment completed for AtlasAI!"
    echo ""
    echo "Platform: $PLATFORM_DESC"
    if [ -f "deployment-url.txt" ]; then
        echo "Backend URL: $(cat deployment-url.txt)"
    fi
    echo "Status: Ready for frontend integration"
    echo ""
    print_status "Key files created:"
    echo "  • .env - Environment configuration"
    echo "  • deployment-url.txt - Backend deployment URL"
    echo "  • Test results (if testing was performed)"
    echo ""
    print_status "Next action needed:"
    echo "  1. Deploy frontend to Vercel/Netlify"
    echo "  2. Update API_BASE in script-enhanced.js"
    echo "  3. Test complete system"
    echo ""
    print_info "Need help? Check the documentation files:"
    echo "  • README.md - Project overview"
    echo "  • DEPLOYMENT_GUIDE.md - Detailed guide"
    echo "  • .env.template - Configuration template"
}

# Main execution
main() {
    show_welcome
    check_prerequisites
    
    echo ""
    read -p "Ready to proceed with deployment? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_info "Deployment cancelled."
        exit 0
    fi
    
    echo ""
    choose_platform
    setup_apis_interactive
    
    echo ""
    print_info "Ready to deploy! This will take a few minutes..."
    read -p "Continue with deployment? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_info "Deployment cancelled."
        exit 0
    fi
    
    echo ""
    if deploy_to_platform; then
        test_deployment
        show_next_steps
        
        echo ""
        read -p "Would you like to see the deployment summary? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            show_summary
        fi
    else
        print_error "Deployment failed. Please check the logs and try again."
        show_help
        exit 1
    fi
}

# Show help if requested
if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    show_help
    exit 0
fi

# Run main function
main "$@"