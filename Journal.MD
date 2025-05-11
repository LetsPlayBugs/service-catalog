# 📝 Development Journal

## 🔍 Things Not Considered

1. **Infrastructure**
   - Deployment architecture
   - Server provisioning
   - Network configuration
   - Dockerization of application

2. **CI/CD**
   - Automated testing/coverage
   - Automated linting
   - Deployment pipelines
   - Environment management
   - Code Quality/Static code security analysis (SonarQube/Synk)
   - Dependency updating bots

3. **Scalability/Reliability**
   - Load balancing
   - High availability
   - Disaster recovery

4. **Monitoring & Observability**
   - Request tracing
   - Logging
   - Exception capturing
   - Metrics collection
   - Heartbeat monitors (NestJs Terminus)

5. **Security**
   - Rate limiting
   - API security
   - Data protection
   - CORS
   - OWASP Top Ten

6. **Database**
   - Migrations
   - Connection pooling
   - Add query tracking/auditing
   - Consider Redis for caching
   - Input sanitation/ SQL injection considerations

7. **Development & testing**
   - Implement circular dependency
   - Implement automated import sorting.

8. **Authentication & Authorization**
   - Token storage and revocation
   - Any type of permissioning. A real system would have roles/group based permissioning and organizational level access control

## 📌 Important Notes

### PostgreSQL Configuration
```sql
CREATE EXTENSION pg_trgm;
```
`pg_trgm` is required for the fuzzy searching capabilities. If its not installed, the search wont work.

### Testing
- Current tests focus on happy path end-to-end scenarios for the API's listed in the requirements.
In a real system, I will have comprehensive test coverage on all cases.
For example, we should consider what should happen if the user enters in non-ASCII characters or if malicious users attempt to inject SQL.

### 🐘 Why PostgreSQL?

#### 1. Production-Ready & Extensible
- Battle-tested in production environments
- Rich ecosystem of extensions
- Excellent community support
- Regular updates and security patches

#### 2. Perfect for Our Use Case
Our scenario has two key characteristics:
- **Early Stage Application**: PostgreSQL provides:
  - Easy schema modifications and clearly defined data models
  - Simple scaling path
  - Rich feature set out of the box (extensions/json support)
- **Relational Data Model**: PostgreSQL excels at:
  - Complex relationships. I will likely need to JOIN a lot of tables to curate data.
  - Built in constraints and validations
  - Indexing and query optimizations


### 🐘 CRUD API
I have left signatures for the POST, PATCH and PUT of the Service's API as a demonstration of how I would organize my REST resources

### Pull Requests
Commits were not done through pull requests as this project is a demonstration. In reality, the main branch is protected and modifications are reviewed.

### Data Access Layer (DAL)
 - A lot of large productionized projects have a dedicated data access layer.
 - As this project is still in its early stages, I have elected to choose speed over correctness.
 - Prematch optimization is the root of all evil.
 - The project must be large enough to justify the development cost of a DAL.
