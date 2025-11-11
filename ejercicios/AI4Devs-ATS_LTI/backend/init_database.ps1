# Script para inicializar la base de datos LTI ATS
# Este script ejecuta init.sql y luego crea la primera migración de Prisma

Write-Host "Inicializando base de datos LTI ATS..." -ForegroundColor Cyan
Write-Host ""

# Paso 1: Ejecutar init.sql para crear extensiones
Write-Host "Paso 1: Creando extensiones en la base de datos..." -ForegroundColor Yellow
$initSqlPath = Join-Path $PSScriptRoot "..\database\init.sql"
$psqlPath = "C:\Program Files\PostgreSQL\18\bin\psql.exe"

# Leer DATABASE_URL del .env
$envFile = Join-Path $PSScriptRoot ".env"
if (Test-Path $envFile) {
    $envContent = Get-Content $envFile
    $dbUrl = ($envContent | Where-Object { $_ -match "DATABASE_URL=" }) -replace 'DATABASE_URL="', '' -replace '"', ''
    
    if ($dbUrl) {
        # Extraer información de la URL
        if ($dbUrl -match 'postgresql://([^:]+):([^@]+)@([^:]+):(\d+)/([^?]+)') {
            $user = $matches[1]
            $pass = $matches[2]
            $host = $matches[3]
            $port = $matches[4]
            $db = $matches[5]
            
            Write-Host "Ejecutando init.sql en la base de datos '$db'..." -ForegroundColor Gray
            
            # Ejecutar init.sql
            $env:PGPASSWORD = $pass
            & $psqlPath -U $user -h $host -p $port -d $db -f $initSqlPath
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "Extensiones creadas exitosamente!" -ForegroundColor Green
            } else {
                Write-Host "Advertencia: Error al ejecutar init.sql (puede que las extensiones ya existan)" -ForegroundColor Yellow
            }
            
            Remove-Item Env:\PGPASSWORD
        }
    }
}

Write-Host ""
Write-Host "Paso 2: Creando migración inicial de Prisma..." -ForegroundColor Yellow

# Paso 2: Crear migración de Prisma
Write-Host "Ejecutando: npx prisma migrate dev --name init" -ForegroundColor Gray
npx prisma migrate dev --name init

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Base de datos inicializada exitosamente!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Próximos pasos:" -ForegroundColor Cyan
    Write-Host "1. Generar el cliente de Prisma: npx prisma generate" -ForegroundColor White
    Write-Host "2. (Opcional) Abrir Prisma Studio: npx prisma studio" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "Error al crear la migración. Verifica los errores arriba." -ForegroundColor Red
}

