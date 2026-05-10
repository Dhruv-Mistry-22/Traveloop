# TravelLoop - Git Commit Strategy & Development Workflow

## Overview
This document outlines the commit strategy, branch naming conventions, and collaborative development workflow for the TravelLoop project.

## 🌳 Branch Strategy

### Main Branches
- **`main`** - Production-ready code, always stable
- **`develop`** - Integration branch for features, pre-release testing

### Feature Branches
Format: `feature/<feature-name>`
- Example: `feature/auth-login`, `feature/budget-tracking`, `feature/packing-checklist`

### Bug Fix Branches
Format: `bugfix/<bug-name>`
- Example: `bugfix/login-error`, `bugfix/budget-calculation`

### Hotfix Branches
Format: `hotfix/<issue-name>`
- Example: `hotfix/critical-auth-bug`
- Created from `main` for urgent production issues

### Documentation Branches
Format: `docs/<doc-name>`
- Example: `docs/api-documentation`, `docs/setup-guide`

## 📝 Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type
- **feat** - New feature
- **fix** - Bug fix
- **docs** - Documentation changes
- **style** - Code style changes (formatting, semicolons, etc.)
- **refactor** - Code refactoring without feature change
- **perf** - Performance improvements
- **test** - Adding tests
- **chore** - Build, dependencies, configuration
- **ci** - CI/CD configuration
- **revert** - Reverting a previous commit

### Scope
- **auth** - Authentication module
- **dashboard** - Dashboard module
- **trips** - Trip management
- **itinerary** - Itinerary builder
- **budget** - Budget tracking
- **packing** - Packing checklist
- **notes** - Notes/journal
- **shared** - Shared itineraries
- **profile** - User profile
- **api** - API/backend
- **ui** - UI/frontend components
- **db** - Database schema

### Subject
- Use imperative mood ("add" not "added" or "adds")
- Don't capitalize first letter
- No period at the end
- Limit to 50 characters

### Body
- Explain what and why, not how
- Wrap at 72 characters
- Separate from subject with blank line
- Use bullet points for multiple changes

### Footer
- Reference issues: `Fixes #123`, `Closes #456`
- Breaking changes: `BREAKING CHANGE: description`

## 📋 Commit Examples

### Feature Commit
```
feat(auth): implement JWT authentication

- Add JWT token generation and validation
- Implement password hashing with bcryptjs
- Add auth middleware for protected routes
- Create login and signup endpoints

Fixes #12
```

### Bug Fix Commit
```
fix(budget): correct expense calculation

The daily budget was incorrectly summing expenses.
Now properly filters expenses by trip and date range.

Fixes #34
```

### Refactor Commit
```
refactor(api): extract authentication logic to service

Move authentication utilities to separate service layer
for better code organization and reusability.
```

### Documentation Commit
```
docs: add API endpoint documentation

Added comprehensive documentation for all REST endpoints
including request/response examples and error handling.
```

### Chore Commit
```
chore: update dependencies

- Update Next.js to 16.2.6
- Update Prisma to 5.8.0
- Update TypeScript to 5.3.3
```

## 🔄 Development Workflow

### 1. Starting a New Feature

```bash
# Update main and develop branches
git checkout main
git pull origin main
git checkout develop
git pull origin develop

# Create feature branch from develop
git checkout -b feature/my-feature develop

# Make changes and commit
git add .
git commit -m "feat(scope): description"

# Push to remote
git push -u origin feature/my-feature
```

### 2. Regular Development Commits

```bash
# Make changes
git add src/file.ts

# Commit with meaningful message
git commit -m "feat(dashboard): add recent trips widget"

# Push periodically
git push origin feature/my-feature
```

### 3. Pull Request Process

- Create PR from feature branch to `develop`
- PR title should follow commit format: `feat(scope): description`
- Add detailed description of changes
- Link related issues: `Fixes #123`
- Request code review
- Address review comments with new commits
- Squash commits before merge if needed

### 4. Merging to Develop

```bash
# After PR approval
git checkout develop
git pull origin develop
git merge feature/my-feature
git push origin develop

# Delete feature branch
git branch -d feature/my-feature
git push origin --delete feature/my-feature
```

### 5. Release to Main

```bash
# When develop is ready for release
git checkout main
git pull origin main
git merge develop
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin main
git push origin v1.0.0

# Create release notes with changes since last tag
git log v0.9.0..v1.0.0 --oneline
```

## 🐛 Handling Hotfixes

```bash
# Create hotfix branch from main
git checkout -b hotfix/critical-issue main

# Fix issue and commit
git commit -m "fix(auth): critical authentication bug"

# Merge to main
git checkout main
git merge hotfix/critical-issue
git tag -a v1.0.1 -m "Hotfix version 1.0.1"
git push origin main v1.0.1

# Merge back to develop
git checkout develop
git merge hotfix/critical-issue
git push origin develop

# Delete hotfix branch
git branch -d hotfix/critical-issue
git push origin --delete hotfix/critical-issue
```

## ✅ Pre-Commit Checklist

Before committing, ensure:
- [ ] Code follows project style guide
- [ ] All tests pass
- [ ] No console.log or debug code
- [ ] TypeScript compiles without errors
- [ ] Commit message follows format
- [ ] Changes are logically grouped
- [ ] No accidental files included

## 📊 Commit Statistics

After each sprint, track:
- Number of commits
- Feature vs fix ratio
- Average commits per developer
- Time between commits

## 🎯 Module-Specific Commit Guidelines

### Authentication Module (`auth`)
```
feat(auth): implement login functionality
feat(auth): add forgot password flow
fix(auth): fix token expiration issue
```

### Trip Management (`trips`)
```
feat(trips): add multi-city trip support
feat(trips): implement trip cloning
fix(trips): fix trip date validation
```

### Budget Tracking (`budget`)
```
feat(budget): add expense categorization
feat(budget): implement budget alerts
fix(budget): correct total calculation
```

### Itinerary Builder (`itinerary`)
```
feat(itinerary): add drag-and-drop stop reordering
feat(itinerary): integrate mapbox for activity locations
refactor(itinerary): improve activity list performance
```

## 📞 Review Guidelines

### For Reviewers
- Check commit messages for clarity
- Verify changes match commit description
- Look for logical grouping
- Ensure no unrelated changes mixed in

### For Authors
- One feature per PR when possible
- Keep commits focused and atomic
- Write clear PR descriptions
- Respond promptly to review feedback

## 🔗 Reference

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
- [Semantic Versioning](https://semver.org/)

---

**Remember: Good commit messages make project history clear and maintainable!**
