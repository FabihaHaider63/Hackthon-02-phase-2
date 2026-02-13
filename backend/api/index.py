# api/index.py
# Vercel-compatible entry point for FastAPI app

from mangum import Mangum
from serverless_main import app

# Create a Mangum adapter to handle Vercel's serverless environment
handler = Mangum(app, lifespan="off")