# Code Red: The Cyber Buzzer Battle - Registration Portal

A modern, responsive web application for team registration in the "Code Red: The Cyber Buzzer Battle" quiz competition. This portal provides a seamless registration experience with real-time validation, file upload capabilities, and automated data storage.

## 🌐 Live Demo

**[Visit the Live Application](https://csc-reg-aiit.netlify.app/)**

## 📋 Project Overview

Code Red: The Cyber Buzzer Battle is a team-based quiz competition designed for Computer Science students. This registration portal allows teams to register with comprehensive validation, secure file uploads, and automated WhatsApp group integration for event updates.

### Key Features

- **Dynamic Team Management**: Add/remove team members (3-5 members required)
- **Real-time Form Validation**: Instant feedback on form inputs
- **File Upload System**: Secure PDF upload for ID verification
- **Responsive Design**: Optimized for desktop and mobile devices
- **Data Persistence**: Automatic data storage with Supabase backend
- **Email Validation**: Ensures non-Amity email addresses only
- **Success Flow**: Smooth transition to thank you page with WhatsApp integration

## 🛠️ Technologies Used

### Frontend Technologies

#### HTML5
**HyperText Markup Language (HTML)** is the standard markup language for documents designed to be displayed in a web browser. HTML5 is the latest version that includes new semantic elements, form controls, and multimedia support without requiring additional plugins.

#### CSS3
**Cascading Style Sheets (CSS)** is a style sheet language used for describing the presentation of a document written in HTML. CSS3 introduces advanced features like animations, gradients, flexbox, and responsive design capabilities.

#### JavaScript (ES6+)
**JavaScript** is a high-level, interpreted programming language that enables interactive web pages and dynamic user interfaces. Modern JavaScript (ES6+) includes features like arrow functions, async/await, modules, and enhanced DOM manipulation.

### Backend & Database

#### Supabase
**Supabase** is an open-source Backend-as-a-Service (BaaS) that provides a complete backend solution including:
- **PostgreSQL Database**: Robust relational database with real-time subscriptions
- **Authentication**: Built-in user authentication and authorization
- **Storage**: File storage with automatic optimization and CDN
- **Edge Functions**: Serverless functions for custom business logic
- **Real-time**: Live data synchronization across clients

## 📁 Project Structure

```
csc-reg-form/
├── index.html              # Main registration form
├── README.md               # Project documentation
├── assets/
│   └── style.css          # Styling and animations
├── pages/
│   └── thankyou.html      # Success/thank you page
└── scripts/
    ├── script.js          # Form logic and validation
    └── supabase.js        # Database operations
```

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd csc-reg-form
   ```

2. **Configure Supabase**
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Update the credentials in [`scripts/supabase.js`](scripts/supabase.js):
     ```javascript
     const SUPABASE_URL = 'your-project-url';
     const SUPABASE_ANON_KEY = 'your-anon-key';
     ```

3. **Set up the database**
   - Create a table named `registrations` with the following schema:
     ```sql
     CREATE TABLE registrations (
       id SERIAL PRIMARY KEY,
       team_leader_name VARCHAR(255) NOT NULL,
       team_leader_enroll VARCHAR(50) NOT NULL,
       department VARCHAR(100) NOT NULL,
       course VARCHAR(100) NOT NULL,
       section VARCHAR(10) NOT NULL,
       batch VARCHAR(20) NOT NULL,
       email VARCHAR(255) NOT NULL,
       phone VARCHAR(15) NOT NULL,
       team_members JSONB NOT NULL,
       created_at TIMESTAMP DEFAULT NOW()
     );
     ```

4. **Configure storage**
   - Create a storage bucket named `id-cards` in your Supabase project
   - Set appropriate permissions for file uploads

5. **Serve the application**
   - Use a local server (Live Server extension in VS Code recommended)
   - Or deploy to any static hosting service

## 🎯 Form Validation Rules

- **Team Leader Information**: All fields required
- **Email**: Must be non-Amity domain (@amity.edu, @amityuniversity.in not allowed)
- **Phone**: Must be exactly 10 digits
- **Team Members**: Minimum 3, maximum 5 members
- **ID Proof**: PDF format only, maximum 2MB file size
- **Enrollment Numbers**: Required for all team members

## 🎨 Design Features

- **Dark Theme**: Modern dark UI with cyan accent colors
- **Smooth Animations**: Fade transitions and interactive hover effects
- **Responsive Layout**: Adapts to different screen sizes
- **Loading States**: Visual feedback during form submission
- **Error Handling**: Clear error messages and visual indicators

## 📱 Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Create a Pull Request

## 📄 License

This project is created for the Microsoft Student Tech Community. All rights reserved © 2025.

## 📞 Support

For technical support or questions about the registration process, please contact the Microsoft Student Tech Community.

---

**Built with ❤️ by Microsoft Student Tech Community**
