function showAlert() {
    alert("Welcome to Galaxy University! We're excited to help you explore your educational journey.");
}

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});