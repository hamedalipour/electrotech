/** اصلاح package.json / package-lock.json: نام برند + توضیح سالم UTF-8 */
const fs = require('fs');

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.name = 'electrotech';
pkg.description = 'وب‌سایت مرکز تخصصی تعمیرات لوازم خانگی الکتروتک — تهران';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n', 'utf8');

let lock = fs.readFileSync('package-lock.json', 'utf8');
lock = JSON.parse(lock);
lock.name = 'electrotech';
if (lock.packages && lock.packages['']) lock.packages[''].name = 'electrotech';
if (lock.packages && lock.packages['']) {
  lock.packages[''].description = 'وب‌سایت مرکز تخصصی تعمیرات لوازم خانگی الکتروتک — تهران';
}
fs.writeFileSync('package-lock.json', JSON.stringify(lock, null, 2) + '\n', 'utf8');

console.log('package.json name:', pkg.name);
console.log('package-lock name:', lock.name);
