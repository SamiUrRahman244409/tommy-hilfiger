#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Static Site Generation...');

// Ensure environment variables are set
const requiredEnvVars = [
  'NEXT_PUBLIC_STRAPI_API_URL',
  'STRAPI_API_TOKEN',
  'NEXT_PUBLIC_SITE_URL'
];

console.log('📋 Checking environment variables...');
requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    console.warn(`⚠️  Warning: ${envVar} is not set`);
  } else {
    console.log(`✅ ${envVar} is set`);
  }
});

// Clean previous build
console.log('🧹 Cleaning previous build...');
try {
  if (fs.existsSync('.next')) {
    fs.rmSync('.next', { recursive: true, force: true });
  }
} catch (error) {
  console.log('No previous build to clean');
}

// Build the application
console.log('🔨 Building Next.js application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Verify static generation
console.log('🔍 Verifying static generation...');
const buildDir = '.next/server/app';
const staticPages = [
  'page.html',
  'menu/page.html',
  'cart/page.html',
  'checkout/page.html',
  'checkout/success/page.html'
];

staticPages.forEach(page => {
  const pagePath = path.join(buildDir, page);
  if (fs.existsSync(pagePath)) {
    console.log(`✅ ${page} generated`);
  } else {
    console.warn(`⚠️  ${page} not found`);
  }
});

// Check for product pages
const productsDir = path.join(buildDir, 'products/detail');
if (fs.existsSync(productsDir)) {
  const productDirs = fs.readdirSync(productsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory());
  console.log(`✅ Generated ${productDirs.length} product detail pages`);
} else {
  console.warn('⚠️  No product detail pages found');
}

// Check API routes
const apiDir = '.next/server/app/api';
if (fs.existsSync(apiDir)) {
  console.log('✅ API routes available for revalidation');
} else {
  console.warn('⚠️  API routes not found');
}

console.log('🎉 Static Site Generation completed!');
console.log('📁 Static pages are available in the ".next" directory');
console.log('⏰ Pages will revalidate every 12 hours');
console.log('🔄 Use /api/revalidate endpoint for manual revalidation'); 