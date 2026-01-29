<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>


![schooldash-dahboard-page](https://i.postimg.cc/4d3Ydcnt/Screenshot-2025-05-23-201933.png)
![Dashboard Screenshot](https://i.postimg.cc/6qXpDbF9/Screenshot-2025-05-23-191142.png)
![Dashboard Screenshot](https://i.postimg.cc/pXY6HXdx/127-0-0-1-8000-admin-users.png)
![Dashboard Screenshot](https://i.postimg.cc/Kjx6G0CS/127-0-0-1-8000-show-2-3.png)
![Dashboard Screenshot](https://i.postimg.cc/13SZW9SL/Screenshot-2025-05-29-202150.png)
![Dashboard Screenshot](https://i.postimg.cc/Hs99fVxj/127-0-0-1-8000-admin-tags-sort-oldest-2.png)
![Dashboard Screenshot](https://i.postimg.cc/cCTLqGgm/Screenshot-2025-06-01-212310.png)
![Blog page](https://i.postimg.cc/2ync7LDT/Screenshot-2026-01-29-172058.png)
![Show page](https://i.postimg.cc/cJjFqB1w/Screenshot-2026-01-29-172153.png)
![Create markdown](https://i.postimg.cc/Y9MwF7gW/Screenshot-2026-01-29-172325.png)
![Edit markdown](https://i.postimg.cc/SQ1wSCTF/Screenshot-2026-01-29-172353.png)
![code block preview](https://i.postimg.cc/WbnSpvb2/Screenshot-2026-01-29-172230.png)
![comments model](https://i.postimg.cc/QdHRd9Yt/Screenshot-2025-05-31-160114.png)
![comment report model](https://i.postimg.cc/HnLVkLCK/Screenshot-2025-06-01-215207.png)

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
- **Reports on posts and comments**
- **Approve/Disapprove posts action**
- **profile settings**
- **Full text search**  
- **Advanced Filtering with multi sort options**
- **Polymorphic like system : handle rapid likes up to 30 on posts and comments**
- **Comments/replies edit/delete/like/report**
- **Users can view who liked**
- **Toggle Follow/Unfollow**

### 🚀Coming soon
- **Realtime notifications + enhancements** 


