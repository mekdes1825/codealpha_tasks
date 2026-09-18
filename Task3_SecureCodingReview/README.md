# CodeAlpha Task 3 — Secure Coding Review

## Project Overview

This project demonstrates a security-focused code review of a small Python Flask login application using SQLite.

The original application was intentionally written with common security weaknesses. The code was manually reviewed, tested, and scanned with Bandit. The identified vulnerabilities were then remediated using secure coding practices.

## Technologies Used

- Python 3.13
- Flask
- SQLite
- Werkzeug Security
- Bandit
- Kali Linux

## Security Issues Identified and Remediated

### 1. SQL Injection

**Vulnerable code:**

The original application constructed an SQL query by directly concatenating user-controlled input.

**Risk:**

An attacker could manipulate the SQL query through the username or password fields.

**Remediation:**

The query was changed to use parameterized SQL:

```python
query = "SELECT * FROM users WHERE username = ?"
user = db.execute(query, (username,)).fetchone()

This separates user input from the SQL command.

2. Plaintext Password Storage

Vulnerable behavior:

The original application stored passwords directly in the database.

Risk:

If the database were compromised, users' passwords could be exposed immediately.

Remediation:

Werkzeug's password hashing functions were used:

from werkzeug.security import generate_password_hash, check_password_hash

Passwords are verified using:

check_password_hash(user[2], password)

3. Flask Debug Mode Enabled

Vulnerable code:

app.run(debug=True)

Risk:

Debug mode can expose sensitive application information and should not be enabled in a production environment.

Remediation:

Debug mode was disabled:

app.run(debug=False)

Static Security Analysis

Bandit was used to scan the application before and after remediation.

Before Remediation

Bandit identified:

B608 — Hardcoded SQL expression
B201 — Flask debug mode enabled
After Remediation

Bandit reported:

No issues identified.

The final scan contained:

High severity: 0
Medium severity: 0
Low severity: 0

A clean Bandit scan means Bandit did not detect issues covered by its checks; it does not guarantee that an application is completely secure.

Functional Testing

The remediated application was tested locally.

Tests included:

Login page loads successfully.
Valid credentials successfully authenticate.
Password verification works using the password hash.
Invalid credentials are rejected.
Parameterized SQL is used for database queries.
Flask debug mode is disabled.
Security Best Practices Applied
Use parameterized SQL queries.
Never store passwords in plaintext.
Use established password-hashing libraries.
Disable debug mode in production.
Perform static security analysis.
Manually review security-sensitive code.
Test security fixes after remediation.
Evidence
Bandit Scan Before Remediation

Plaintext Password Storage

SQL Injection Vulnerability

Debug Mode Enabled

Parameterized SQL

Password Hashing

Password Verification

Debug Mode Disabled

Bandit Scan After Remediation

Successful Login Test

Conclusion

The review identified three security weaknesses in the original Flask application: SQL injection, plaintext password storage, and enabled debug mode.

The vulnerabilities were remediated using parameterized SQL queries, secure password hashing and verification, and disabled debug mode. The application was then tested and scanned again with Bandit.





