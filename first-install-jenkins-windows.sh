# Убедитесь, что скрипты можно запускать
Set-ExecutionPolicy RemoteSigned -scope CurrentUser

# Установка Chocolatey, если он еще не установлен
if (!(Get-Command choco -ErrorAction SilentlyContinue)) {
    Set-ExecutionPolicy Bypass -Scope Process -Force;
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072;
    iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'));
}

# Установка Jenkins
choco install jenkins -y

# Установка Maven
choco install maven -y

# Вывод версии Maven для проверки
mvn -v

# Открытие Jenkins в браузере
Start-Process "http://localhost:8080"