# AI WatchTower

AI WatchTower is an enterprise AI governance and security platform designed to help organizations monitor and manage how generative AI is used within their workforce.

The project focuses on providing visibility into AI usage, identifying potentially risky behavior, enforcing organizational policies, and giving authorized staff the tools needed to review AI-related security events.

## Problem

The adoption of generative AI in organizations introduces new security and governance challenges. Employees may unintentionally share sensitive information with AI systems, use services that are not approved by their organization, or interact with AI in ways that violate internal policies.

Traditional security systems are not always designed to understand these AI-specific interactions. Organizations therefore need a way to monitor AI usage, identify unusual patterns, and respond to potential risks without unnecessarily exposing private employee information.

## Solution

AI WatchTower is designed as a governance layer between employees and enterprise AI services.

The platform separates the employee experience from the administrative security experience using role-based access.

Employees can use an AI Assistant and approved enterprise services, while authorized staff can access organizational security information, behavioral analytics, and risk intelligence.

The overall system is planned around the following flow:

```text
Employee
   |
   v
AI Assistant
   |
   v
AI WatchTower
   |
   +-- Interaction Analysis
   +-- Policy Evaluation
   +-- Behavioral Analysis
   +-- Security Events
   |
   v
Staff / Admin Dashboard
```

## Current Development Focus

The current development focus is the AI Digital Twin.

The Digital Twin is a behavioral representation of an employee's interaction patterns with enterprise AI. It is not intended to be a literal digital copy of an individual.

The system will use interaction history to derive information such as:

* AI interaction frequency
* Common interaction categories
* Usage patterns
* Policy-related events
* Data sensitivity indicators
* Changes in activity over time
* Behavioral trends

The goal is to make this information dynamic and data-driven rather than using static dashboard values.

For example, if an employee's interaction history changes in the database, the corresponding Digital Twin metrics should update accordingly.

## AI Digital Twin Architecture

The planned data flow is:

```text
MongoDB
   |
   v
Employee Data + AI Interaction Data
   |
   v
Node.js / Express API
   |
   v
Digital Twin Analysis
   |
   v
React Frontend
   |
   v
Behavioral Intelligence Dashboard
```

The Digital Twin will focus primarily on aggregated behavioral signals rather than displaying the contents of private employee conversations.

## Role-Based Access

### Staff / Admin

Authorized staff will be able to access:

* Organizational AI activity
* Employee behavioral information
* Risk analytics
* Security events
* Digital Twin
* Audit information

### Employee

Employees will have access to:

* Personal workspace
* AI Assistant
* Approved cloud services
* Engineering services
* Personal profile

Employees will not have access to:

* Other employees' behavioral information
* Organizational risk analytics
* Employee risk rankings
* Administrative monitoring tools
* Staff security dashboards

Access restrictions will eventually be enforced through backend authorization rather than relying only on frontend visibility.

## Planned Features

### AI Digital Twin

Behavioral intelligence layer for analyzing enterprise AI usage patterns and identifying meaningful changes in activity.

Status: In active development.

### AI Immune System

A planned adaptive defense layer for identifying recurring AI-specific threats and improving defensive policies based on observed attack patterns.

Status: Planned.

### AI Risk Weather

A planned organizational risk monitoring system intended to show changes and trends in enterprise AI risk.

Status: Planned.

### AI Black Box

A planned audit layer for maintaining a traceable record of important AI governance and security events.

Status: Planned.

### AI Negotiator

A planned policy-aware system that provides safer alternatives when a request conflicts with enterprise policies instead of simply blocking the request.

For example, if an employee attempts to send confidential information to an external AI service, the system could suggest using an approved enterprise environment instead.

Status: Planned.

## Technology Stack

### Frontend

* React
* JavaScript
* HTML
* CSS

### Backend

* Node.js
* Express.js
* REST APIs

### Database

* MongoDB

### Development Tools

* Git
* GitHub
* Cursor
* Visual Studio Code

Additional technologies may be introduced as the project develops.

## Project Structure

The planned project structure is:

```text
AIWatchTower/
|
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── ...
|
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── ...
|
├── README.md
├── .gitignore
└── package.json
```

The structure may change as development progresses.

## Development Roadmap

### Phase 1 — Project Setup

* [x] Product concept
* [x] Landing page design
* [x] Login interface
* [x] Staff/Admin dashboard design
* [x] Employee workspace design
* [x] AI Assistant interface
* [x] Git repository setup

### Phase 2 — AI Digital Twin

* [ ] Set up Node.js backend
* [ ] Set up Express server
* [ ] Connect MongoDB
* [ ] Create employee data model
* [ ] Create AI interaction data model
* [ ] Add sample data
* [ ] Build Digital Twin analysis logic
* [ ] Create Digital Twin API
* [ ] Connect React frontend to the API
* [ ] Add activity visualizations
* [ ] Add behavioral signals
* [ ] Support multiple employees

### Phase 3 — AI Governance

* [ ] AI interaction monitoring
* [ ] Policy evaluation
* [ ] Risk scoring
* [ ] High-risk alerts
* [ ] Role-based authorization

### Phase 4 — Advanced Features

* [ ] AI Immune System
* [ ] AI Risk Weather
* [ ] AI Black Box
* [ ] AI Negotiator
* [ ] Collective threat intelligence

### Phase 5 — Production Readiness

* [ ] Authentication
* [ ] API validation
* [ ] Error handling
* [ ] Logging
* [ ] Testing
* [ ] Security hardening
* [ ] Deployment
* [ ] Documentation

## Security and Privacy Principles

AI WatchTower is being designed around a few basic principles.

### Least Privilege

Users should only have access to information required for their role.

### Role-Based Access

Sensitive organizational and employee security information should only be available to authorized staff.

### Data Minimization

The Digital Twin should prioritize behavioral signals and aggregated information instead of unnecessarily exposing private conversation content.

### Auditability

Important governance and security events should be traceable and available for review.

### Human Oversight

High-impact security decisions should support human review rather than relying entirely on automated decisions.

## Development Approach

The project is being developed incrementally.

The goal is to build functional features backed by real data rather than creating a collection of static interface mockups.

The development process is:

```text
Design
  |
  v
Data Model
  |
  v
Backend API
  |
  v
Frontend Integration
  |
  v
Feature Logic
  |
  v
Testing
  |
  v
Refinement
```

## Project Status

AI WatchTower is currently under active development.

The AI Digital Twin is the current primary development focus. Features marked as planned have not yet been implemented.

## Team

Divyanka and Amrita

The project is being developed as a student project focused on AI governance, cybersecurity, software engineering, and enterprise AI systems.
