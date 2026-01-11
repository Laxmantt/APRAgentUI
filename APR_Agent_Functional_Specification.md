# Application Portfolio Rationalization (APR) Agent
## Functional Specification Document

**Version:** 1.0  
**Date:** January 7, 2026  
**Document Type:** Functional Specification

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Command Center (Home Page)](#command-center)
3. [Application Assessments](#assessments)
4. [Application Details](#application-details)
5. [Migration Waves](#migration-waves)
6. [Data Ingestion](#data-ingestion)
7. [Reports & Analytics](#reports)

---

## Executive Summary

The **Application Portfolio Rationalization (APR) Agent** is an AI-powered enterprise platform designed to assess, modernize, and plan the migration of application portfolios at scale. It provides strategic insights, granular technical analysis, and automated migration wave planning.

### Key Capabilities
- **Portfolio Health Monitoring**: Real-time KPIs and risk analytics
- **AI-Driven Assessments**: Automated modernization recommendations
- **Migration Planning**: Wave-based execution blueprints
- **Dependency Mapping**: Cluster integrity and integration risk analysis
- **Data Ingestion**: Multi-format data source onboarding

---

## 1. Command Center (Home Page)

**Route:** `/`  
**Purpose:** Central dashboard for executive visibility and strategic decision-making.

### 1.1 Portfolio Health & Vitals

**Data Displayed:**
- **Total Apps**: Count of all applications in the portfolio
- **Assessed**: Number of completed assessments
- **Cloud Ready**: Applications approved for migration
- **Pending Review**: Applications awaiting stakeholder approval

**Explanation:**  
Real-time roll-up of the entire portfolio's health metrics. Provides at-a-glance visibility into assessment progress and migration readiness.

**User Actions:**
- Monitor KPIs and trends
- Identify assessment bottlenecks
- Track migration velocity

**Screenshot:** Portfolio Health & Vitals Panel
![Portfolio Health](C:/Users/madhu/.gemini/antigravity/brain/ced5a0c4-a155-40e6-b47f-adbeeb3c3d4f/command_center_verification_1767770728254.png)

---

### 1.2 Quick Navigation & Actions

**Data Displayed:**
- Assessments: Link to application inventory
- Migration Waves: Link to wave planning
- Data Ingestion: Link to data upload
- Reports: Link to report generation

**Explanation:**  
Provides rapid navigation shortcuts to key functional modules, reducing click-depth for common workflows.

**User Actions:**
- One-click navigation to specific pages
- Quick access to frequently used features

---

### 1.3 Strategic Insights & Blockers

**Data Displayed:**
- Application Name
- Risk Score (0-100%)
- Data Gravity (GB/TB)
- Dependency Count

**Explanation:**  
Identifies "critical migration blockers" - applications with:
- High risk scores (>75%)
- High data gravity (>2TB)
- Hard dependencies with low health scores

These require immediate stakeholder attention and may delay wave execution.

**User Actions:**
- Click on a blocker to view granular details
- Prioritize remediation efforts
- Escalate to technical teams

---

### 1.4 Systemic Dependency Exposure (Heatmap)

**Data Displayed:**
- Technology/Data Source Name
- Average Risk Score
- Application Count

**Explanation:**  
Visualizes portfolio-wide exposure to specific technologies (e.g., Oracle, Legacy CRM). Identifies "toxic dependencies" that consistently drive up risk across the entire portfolio.

**User Actions:**
- Hover for detailed statistics
- Identify high-risk technology clusters
- Prioritize technology modernization initiatives

**Screenshot:** Dependency Risk Heatmap
![Heatmap](C:/Users/madhu/.gemini/antigravity/brain/ced5a0c4-a155-40e6-b47f-adbeeb3c3d4f/dashboard_page_1767769926069.png)

---

### 1.5 Recent System Activity

**Data Displayed:**
- User Name
- Action Performed
- Target Application
- Timestamp

**Explanation:**  
Live audit trail of user and system actions, including assessment updates, wave modifications, and data ingestion events.

**User Actions:**
- Monitor team activity
- Track assessment progress
- Audit compliance

---

## 2. Application Assessments (Listing Page)

**Route:** `/assessment`  
**Purpose:** High-level inventory management and application discovery.

### 2.1 Application Grid

**Data Displayed:**
- Application Name & Version
- Type (Web, API, Batch, etc.)
- Business Complexity (Low/Medium/High)
- NFR Complexity (Low/Medium/High)
- Regulatory Compliance (GDPR, PCI, HIPAA)
- Status Badge (Completed, In Progress, Pending)
- Dependencies Count
- Data Sources

**Explanation:**  
A searchable and filterable inventory of all applications within the assessment scope. Provides a high-level overview of technical profiles and compliance requirements.

**User Actions:**
- **Search**: Find applications by name or attributes
- **Filter**: Filter by status, type, or complexity
- **View Details**: Click "View Details" button for deep analysis
- **Navigate**: Click on any card to open granular assessment

**Screenshot:** Assessment Grid
![Assessment Grid](C:/Users/madhu/.gemini/antigravity/brain/ced5a0c4-a155-40e6-b47f-adbeeb3c3d4f/assessment_page_top_1767769940741.png)

---

## 3. Application Details (Granular Analysis)

**Route:** `/assessment/[id]`  
**Purpose:** Deep-dive technical and strategic assessment for a single application.

### 3.1 Intelligent App Profile (AI)

**Data Displayed:**
- Technical Profile Summary
- Business Value Score
- Modernization Readiness Score
- AI-Generated Insights

**Explanation:**  
AI-generated summary of the application's technical nature, business criticality, and suitability for modernization. Uses machine learning to analyze patterns across the portfolio.

**User Actions:**
- Review AI assessment
- Validate technical profile
- Override AI recommendations if needed

---

### 3.2 Modernization Advisory

**Data Displayed:**
- **Recommended Strategy**: Rehost, Replatform, Refactor, Retire, Retain
- **Confidence Level**: 0-100%
- **Rationale**: Detailed explanation of recommendation
- **Effort Estimate**: Low/Medium/High
- **Risk Assessment**: Technical and business risks

**Explanation:**  
Automated rationalization logic based on technical complexity, business value, and portfolio patterns. Provides data-driven modernization recommendations.

**User Actions:**
- Review strategy recommendation
- Accept or override strategy
- Document decision rationale
- Assign to migration wave

---

### 3.3 Compliance & Financial Analysis

**Data Displayed:**
- Regulatory Tags (GDPR, PCI, HIPAA, SOX)
- Estimated Modernization Cost (Low/Mid/High range)
- Effort Points (Calculated based on complexity)
- Compliance Risk Score
- Financial Impact

**Explanation:**  
Financial forecasting and legal risk mapping for the application. Helps prioritize investments and ensure regulatory compliance during migration.

**User Actions:**
- Review cost estimates
- Validate compliance requirements
- Export for budget planning
- Flag high-risk compliance items

---

### 3.4 Application Information

**Data Displayed:**
- Status, Type, Complexity
- Version, Business Complexity, NFR Complexity
- Regulatory Compliance
- Dependencies List

**Explanation:**  
Core technical metadata and configuration details for the application.

**User Actions:**
- Review technical specifications
- Validate dependency mappings
- Update metadata as needed

---

### 3.5 Assessment Workflow

**Data Displayed:**
- Editable technical fields:
  - Frameworks & Technologies
  - Data Sources
  - Traffic Patterns
  - Integration Points
  - Custom Attributes

**Explanation:**  
Collaborative workspace for technical architects to refine and enhance the assessment. Changes trigger AI re-appraisal of modernization strategy.

**User Actions:**
- **Edit Fields**: Update technical specifications
- **Save Changes**: Trigger AI re-assessment
- **Add Notes**: Document architectural decisions
- **Attach Files**: Upload technical diagrams

---

### 3.6 Integration & Migration Risks

**Data Displayed:**
- Connected Systems
- Interface Type (REST, SOAP, MQ, etc.)
- Health Score (0-100%)
- Transition Risks
- Mitigation Strategies

**Explanation:**  
Analysis of how this application connects to others and what might break during migration. Identifies integration points that require special handling.

**User Actions:**
- Review connectivity health
- Identify high-risk interfaces
- Plan integration testing
- Document mitigation strategies

---

### 3.7 Dependency Network Mapping

**Data Displayed:**
- Inbound Dependencies (who calls this app)
- Outbound Dependencies (what this app calls)
- Dependency Strength (Hard/Soft)
- Health Score
- Wave Assignment

**Explanation:**  
Critical path analysis to ensure cluster integrity. Prevents "split clusters" where tightly-coupled applications are migrated in different waves.

**User Actions:**
- Visualize dependency graph
- Identify cluster boundaries
- Validate wave assignments
- Flag split cluster risks

---

### 3.8 Data Gravity & Migration Drag

**Data Displayed:**
- Data Volume (GB/TB)
- Growth Rate
- Data Sensitivity
- Migration Complexity
- Estimated Transfer Time

**Explanation:**  
Quantifies the "gravitational pull" of large datasets that may slow down or complicate migration. Helps plan data migration strategies.

**User Actions:**
- Review data volume metrics
- Plan data migration approach
- Estimate transfer windows
- Identify data optimization opportunities

---

## 4. Migration Waves (Planning Page)

**Route:** `/waves`  
**Purpose:** Temporal planning and cluster-based grouping for migration execution.

### 4.1 Wave Rollup Cards

**Data Displayed:**
- Wave Number
- Total Applications
- Ready vs. Blocked Count
- Compliance Readiness (GDPR %, PCI count)
- Forecasted Cost
- Wave Velocity Indicator

**Explanation:**  
High-level status of planned migration phases. Provides executive visibility into wave health and readiness.

**User Actions:**
- Select a wave to view details
- Monitor wave progress
- Identify blockers
- Adjust wave assignments

**Screenshot:** Wave Management
![Waves](C:/Users/madhu/.gemini/antigravity/brain/ced5a0c4-a155-40e6-b47f-adbeeb3c3d4f/waves_page_1767769933081.png)

---

### 4.2 Wave Action Plan

**Data Displayed:**
- Infrastructure Preparation Items
- Data Migration Strategy
- Testing Requirements
- Rollback Procedures
- Success Criteria

**Explanation:**  
AI-generated execution checklist for the selected wave. Provides step-by-step guidance for infrastructure and platform teams.

**User Actions:**
- Review action items
- Assign tasks to teams
- Track completion status
- Update timelines

---

### 4.3 Wave Management (Cluster Integrity)

**Data Displayed:**
- Application Name & Version
- Type
- Risk Score
- Migration Path (Strategy)
- Cluster Maturity Status
- Approval Status

**Explanation:**  
Ensures that "hard-linked" applications are migrating in the same wave to avoid latency and integration issues. Flags "Split Clusters" that require attention.

**User Actions:**
- Review cluster integrity
- Identify split clusters
- Reassign applications to different waves
- Approve wave composition

---

### 4.4 Dependencies & Integrations

**Data Displayed:**
- Source → Target Applications
- Dependency Type (API, Database, File, MQ)
- Tech Stack
- Current Environment
- Target Environment
- Description
- Criticality (Low/Medium/High/Critical)

**Explanation:**  
Detailed mapping of current vs. target environments for application dependencies. The "execution blueprint" for the infrastructure team.

**User Actions:**
- Review dependency mappings
- Validate environment transitions
- Plan network configurations
- Document integration changes

---

### 4.5 External Integrations

**Data Displayed:**
- Integration Name
- Type (SaaS, Partner API, Legacy System)
- Tech Stack
- Current/Target Environments
- Criticality

**Explanation:**  
Maps external system integrations that must remain functional during and after migration.

**User Actions:**
- Identify external dependencies
- Plan API compatibility
- Coordinate with vendors
- Test external connections

---

### 4.6 Data Sources

**Data Displayed:**
- Database Name
- Type (SQL, NoSQL, File, etc.)
- Tech Stack
- Current/Target Environments
- Migration Strategy
- Criticality

**Explanation:**  
Inventory of data sources that must be migrated or integrated with the new environment.

**User Actions:**
- Plan data migration
- Validate connectivity
- Estimate migration windows
- Test data synchronization

---

### 4.7 Infrastructure Setup

**Data Displayed:**
- Component Name
- Type (Compute, Storage, Network, Security)
- Tech Stack
- Current/Target Specifications
- Provisioning Status
- Criticality

**Explanation:**  
Infrastructure requirements and provisioning status for the target environment.

**User Actions:**
- Review infrastructure needs
- Provision resources
- Validate configurations
- Track deployment status

---

## 5. Data Ingestion

**Route:** `/data-ingestion`  
**Purpose:** Onboarding external data sources (CMDB, Excel, JSON).

### 5.1 File Upload Zone

**Supported Formats:**
- CSV (Comma-Separated Values)
- JSON (JavaScript Object Notation)
- XML (Extensible Markup Language)
- XLSX (Excel Spreadsheet)

**Data Requirements:**
- Standard schema for Application Inventory
- Dependency Mapping format
- File size limit: 5MB (larger files require batch processing)

**User Actions:**
- **Drag & Drop**: Drag files into the upload zone
- **Browse**: Click to select files from file system
- **Validate**: System validates schema and format
- **Process**: Files are parsed and imported

**Screenshot:** Data Ingestion
![Data Ingestion](C:/Users/madhu/.gemini/antigravity/brain/ced5a0c4-a155-40e6-b47f-adbeeb3c3d4f/data_ingestion_page_1767769948801.png)

---

### 5.2 Recent Uploads

**Data Displayed:**
- File Name
- Upload Date
- File Size
- Status (Success/Error/Processing)
- Error Messages (if applicable)

**Explanation:**  
Tracking of ingestion jobs and schema validation results. Provides visibility into data quality issues.

**User Actions:**
- Monitor upload status
- Review error messages
- Retry failed uploads
- Download processed data

---

## 6. Reports & Analytics

**Route:** `/reports`  
**Purpose:** Stakeholder reporting and export management.

### Available Reports

1. **Executive Summary (PDF)**
   - Portfolio health overview
   - Migration readiness
   - Risk summary
   - Cost estimates

2. **Portfolio Risk Report (Excel)**
   - Application-level risk scores
   - Dependency analysis
   - Compliance status
   - Remediation recommendations

3. **Migration Execution Blueprint (PDF/Excel)**
   - Wave-by-wave execution plan
   - Infrastructure requirements
   - Testing strategies
   - Rollback procedures

4. **Compliance Report (PDF)**
   - Regulatory compliance status
   - Gap analysis
   - Remediation timeline
   - Audit trail

**User Actions:**
- Select report type
- Configure parameters
- Generate report
- Download in preferred format
- Schedule automated reports

---

## Appendix A: Data Models

### Application Data Model
```
{
  id: string
  name: string
  version: string
  type: string
  complexity: "low" | "medium" | "high"
  businessComplexity: string
  nfrComplexity: string
  regulatoryCompliance: string
  dependencies: string[]
  dataSources: string[]
  status: "Completed" | "In Progress" | "Pending"
  assessment: {
    risk: { total: number, status: string }
    strategy: { value: string, confidence: number }
    advisory: string
    wave: { value: number }
  }
  links: Array<{
    id: string
    name: string
    strength: "hard" | "soft"
    health: number
  }>
  dataGravity: {
    volumeGB: number
    growthRate: number
  }
}
```

### Wave Data Model
```
{
  waveNumber: number
  totalApps: number
  readyApps: number
  blockedApps: number
  applications: Application[]
  dependencies: Dependency[]
  externalIntegrations: Integration[]
  dataSources: DataSource[]
  infrastructure: Infrastructure[]
  actionPlan: {
    phases: Phase[]
    risks: Risk[]
    timeline: Timeline
  }
}
```

---

## Appendix B: User Roles & Permissions

### Executive Stakeholder
- View portfolio health
- Review strategic insights
- Approve wave plans
- Generate reports

### Technical Architect
- Perform assessments
- Update technical specifications
- Map dependencies
- Recommend strategies

### Migration Manager
- Plan migration waves
- Assign applications to waves
- Track execution progress
- Manage blockers

### Data Analyst
- Ingest data sources
- Validate data quality
- Generate analytics
- Export reports

---

## Appendix C: Integration Points

### External Systems
- **CMDB**: Application inventory sync
- **ServiceNow**: Ticket integration
- **Jira**: Project tracking
- **Azure DevOps**: Pipeline integration
- **AWS/Azure/GCP**: Cloud provider APIs

### Data Formats
- **Input**: CSV, JSON, XML, XLSX
- **Output**: PDF, Excel, JSON API
- **APIs**: REST, GraphQL

---

## Document Control

**Version History:**
- v1.0 (2026-01-07): Initial release

**Approvals:**
- Technical Lead: [Pending]
- Product Owner: [Pending]
- Stakeholder: [Pending]

**Next Review Date:** 2026-02-07

---

*End of Functional Specification Document*
