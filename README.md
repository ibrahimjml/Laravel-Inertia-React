<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>


![schooldash-dahboard-page](https://i.postimg.cc/4d3Ydcnt/Screenshot-2025-05-23-201933.png)
![Dashboard Screenshot](https://i.postimg.cc/6qXpDbF9/Screenshot-2025-05-23-191142.png)
![Dashboard Screenshot](https://i.postimg.cc/KjfxCGnN/Screenshot-2025-05-23-204316.png)
![Dashboard Screenshot](https://i.postimg.cc/bryjx7K2/127-0-0-1-8000-show-2-search-unapproved.png)
![Dashboard Screenshot](https://i.postimg.cc/sfTFF0kw/127-0-0-1-8000-8.png)
![Dashboard Screenshot](https://i.postimg.cc/9F1yYyq4/Screenshot-2025-05-23-205746.png)

## INSTALLATION
1.📦 Install dependencies
```
composer install
```
2.🛠️ Create a copy of the .env file
```
cp .env.example .env
```
3.🔑 Generate the application key
```
php artisan key:generate
```
4.📦 install node_modules
```
npm install
```
5.🚀 Compile assets with Tailwind CSS
```
npm run dev
```
6.🗄️ Set up the database
```
php artisan migrate
```
7.🔗 Create symbolic link for storage
```
rm public/storage
php artisan storage:link
```
8.🗄️ seed admin user 
```
php artisan db:seed AdminSeeder
```
9.💻 Run the application
```
php artisan serve
```


### Features
- **Login with Recaptcha v2** 
- **Toggle dark/light mode** 
- **User Dashboard**
- **Admin Dashboard**
- **Suspend user action**
- **Approve/Disapprove posts action**
- **Edit profile user**
- **Full text search** 
- **Advanced Filtering Chained filter query**





