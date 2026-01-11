export interface ChatPrompt {
    keywords: string[];
    question: string;
    answer: string;
    contextType?: 'application' | 'risk' | 'wave' | 'architecture' | 'general';
}

export const chatPrompts: ChatPrompt[] = [
    // --- Application Card Specifics ---
    {
        keywords: ['details', 'legacy crm', 'application card'],
        question: "Show me the details for the Legacy CRM application.",
        answer: "Legacy CRM (v2.4.0) is 'In Progress'. Type: Monolith. Business Complexity: Critical. NFR Complexity: High. Compliance: GDPR. Data Sources: SQL Server, Oracle. Dependencies: User Auth, Payment Gateway. ",
        contextType: 'application'
    },
    {
        keywords: ['owner', 'inventory system'],
        question: "Who owns the Inventory System?",
        answer: "Inventory System (v1.2) - Status: Active. Type: 3-Tier. Business Complexity: Medium. NFR Complexity: Medium. Compliance: None. Data Sources: MySQL. Dependencies: Warehouse API, Logistics Service.",
        contextType: 'application'
    },
    {
        keywords: ['technology', 'tech stack', 'hr portal'],
        question: "What is the tech stack for the HR Portal?",
        answer: "HR Portal (v3.0.1) - Status: Review. Type: Web App. Business Complexity: Low. NFR Complexity: Low. Compliance: PII/GDPR. Data Sources: PostgreSQL. Dependencies: Auth0, Employee DB.",
        contextType: 'application'
    },
    {
        keywords: ['dependencies', 'billing engine'],
        question: "What are the dependencies for the Billing Engine?",
        answer: "Billing Engine (v5.0) - Status: Critical. Type: Service. Business Complexity: High. NFR Complexity: Critical. Compliance: PCI-DSS. Data Sources: DynamoDB. Dependencies: Upstream: Order Svc; Downstream: Invoice Gen, GL System.",
        contextType: 'application'
    },
    {
        keywords: ['lifecycle', 'end of life', 'eol'],
        question: "Are there any applications approaching End of Life?",
        answer: "Yes, the 'Legacy Intranet' and 'Old Payroll' systems are flagged as near EOL (End of Life). Immediate replatforming or retirement is recommended."
    },

    // --- Risk Score ---
    {
        keywords: ['risk score', 'highest risk', 'critical'],
        question: "Which applications have the highest risk score?",
        answer: "Critical Risk: 'Legacy CRM' (Score: 85) and 'Mainframe Gateway' (Score: 92). Primary Drivers: The Mainframe Gateway has hard-coded IP dependencies with 15 downstream apps and runs on unsupported OS/2 hardware, posing a severe blockers for the cloud transition.",
        contextType: 'risk'
    },
    {
        keywords: ['compliance', 'gdpr', 'security'],
        question: "How many apps are flagged for compliance issues?",
        answer: "5 apps flagged. Critical focus: 'Customer Data Lake' currently stores unencrypted PII on an open NFS share. Migration path requires immediate 'Re-architecting' to AWS S3 with Server-Side Encryption (SSE-KMS) before lift-and-shift can proceed.",
        contextType: 'risk'
    },
    {
        keywords: ['technical debt', 'debt score'],
        question: "What is the average technical debt across the portfolio?",
        answer: "Avg Debt: High ($2.5M remediation). The 'Billing Engine' is a hotspot; its spaghetti code prevents microservices decoupling, forcing a 'Refactor' approach rather than a simple 'Repackage'.",
        contextType: 'risk'
    },
    {
        keywords: ['vulnerabilities', 'security scan'],
        question: "Show me the latest security scan results.",
        answer: "Scan #2024-10 found 12 critical CVEs in 'Public Web Portal' (Apache Struts v1.x). Remediation: Cannot patch in-place. Recommended Disposition: 'Retire' and replace with SaaS alternative (Salesforce Experience Cloud).",
        contextType: 'risk'
    },
    {
        keywords: ['mitigation', 'risk plan'],
        question: "What is the mitigation plan for high-risk apps?",
        answer: "For the 'Legacy CRM', we are applying the 'Strangler Fig' pattern: gradually extracting modules (Auth, User Profile) to AWS Lambda while keeping the monolith running, reducing risk during the 6-month transition.",
        contextType: 'risk'
    },

    // --- Wave Plan ---
    {
        keywords: ['wave 1', 'first wave', 'migration plan'],
        question: "What applications are in Wave 1?",
        answer: "Wave 1 ('Quick Wins') - Feb 2025. Includes 5 standalone apps (e.g., 'Visitor Log', 'Parking Sys') with zero data dependencies. Strategy: 'Rehost' to AWS EC2. Goal: Validate the Landing Zone connectivity.",
        contextType: 'wave'
    },
    {
        keywords: ['timeline', 'wave schedule'],
        question: "What is the timeline for Wave 2?",
        answer: "Wave 2 (Q2 2025) targets the 'Finance Cluster'. Duration: 12 weeks. Complexity: High due to move-group coupling between 'GL System' and 'Invoicing'. Both must migrate simultaneously to Azure to minimize latency.",
        contextType: 'wave'
    },
    {
        keywords: ['status', 'wave progress'],
        question: "What is the current status of the Pilot Wave?",
        answer: "Pilot Wave Complete (100%). Success: 'Wiki' and 'Intranet' successfully migrated. Learned: Data transfer speeds were 40% slower than expected due to VPN throttling; Direct Connect bandwidth will be increased for Wave 1.",
        contextType: 'wave'
    },
    {
        keywords: ['budget', 'migration cost'],
        question: "What is the estimated budget for the next wave?",
        answer: "Wave 2 Budget: $150k. Breakdown: $60k for dual-running infrastructure costs, $50k for data egress fees (due to heavy Oracle sync), and $40k for external consultancy.",
        contextType: 'wave'
    },
    {
        keywords: ['strategy', 'wave strategy'],
        question: "What is the migration strategy for Wave 3?",
        answer: "Wave 3 ('Core Business'). Strategy: 'Replatform'. We will containerize the 'Order Management' system to run on EKS. Rationale: It requires auto-scaling to handle Black Friday traffic spikes, which the current on-prem VM cluster cannot support.",
        contextType: 'wave'
    },

    // --- Architecture (Source & Target) ---
    {
        keywords: ['source architecture', 'current state'],
        question: "Describe the source architecture of the Trading System.",
        answer: "Source: 'Trading System' relies on a specialized Win32 thick client communicating via DCOM to a central .NET 4.5 server farm. Data persistence is on a clustered SQL Server 2012. Tight coupling prevents independent scaling.",
        contextType: 'architecture'
    },
    {
        keywords: ['target architecture', 'future state', 'cloud design'],
        question: "What is the target architecture for the Trading System?",
        answer: "Target: Cloud-Native Microservices on Azure Service Fabric. The thick client will be replaced by a React Web App. The SQL cluster migrates to Azure SQL Managed Instance for automated high-availability.",
        contextType: 'architecture'
    },
    {
        keywords: ['rpath', 'modernization path', '6r'],
        question: "What is the R-Path for the Document Management System?",
        answer: "Recommendation: 'Refactor'. Rationale: Current reliance on local file system storage (NAS) is incompatible with cloud statelessness. We will refactor the storage layer to use Amazon S3 API and implement a searchable index using OpenSearch.",
        contextType: 'architecture'
    },
    {
        keywords: ['integration', 'hybrid cloud'],
        question: "Will the new architecture support hybrid cloud?",
        answer: "Yes. The 'Mainframe Glue Layer' will remain on-premise. We will deploy an AWS Outpost locally to cache frequent read requests, reducing latency for the new cloud-based 'Account Dashboard' while maintaining the mainframe system of record.",
        contextType: 'architecture'
    },
    {
        keywords: ['database', 'migration', 'schema', 'data dependency'],
        question: "How will the database be migrated considering dependencies?",
        answer: "The 'Customer DB' is shared by 4 apps. We cannot migrate apps individually. Strategy: 'Replatform' the DB to RDS PostgreSQL first, establishing a VPN tunnel for on-prem apps to connect, then migrate apps one by one (Data-First Migration).",
        contextType: 'architecture'
    },
    // --- Real-World Rationalization & Architecture ---
    {
        keywords: ['rationalization', 'wave plan', 'legacy payroll', 'why wave 3'],
        question: "Why is 'Legacy Payroll' scheduled for Wave 3 instead of earlier?",
        answer: "Rationalization: 'Legacy Payroll' (ID: 8) is deferred to Wave 3 due to 'Critical' technical risk and hard dependencies on the 'Mainframe COBOL Gateway'. Its COBOL codebase and SOX compliance requirements necessitate a high-effort 'Retire/Replace' strategy with a SaaS HCM, rather than a direct migration.",
        contextType: 'wave'
    },
    {
        keywords: ['target architecture', 'future state', 'legacy crm'],
        question: "What is the target state architecture for the 'Legacy CRM'?",
        answer: "Target Architecture: 'Microservices on EKS'. The 6-9 month advisory plan includes decoupling legacy business logic, migrating from Oracle to a managed Postgres service, and containerizing modules for scalability on AWS.",
        contextType: 'architecture'
    },
    {
        keywords: ['modernization', 'r-path', 'inventory system'],
        question: "What is the recommended modernization path for the 'Inventory System'?",
        answer: "Path: 'Replatform'. We will move existing workloads to 'Managed RDS + Containerized App'. This allows us to preserve business logic while offloading database management to the cloud provider, reducing operational overhead by ~30%.",
        contextType: 'architecture'
    },
    {
        keywords: ['wave 1', 'quick wins', 'criteria', 'procurement pro'],
        question: "What rationalization criteria were used to assign 'Procurement Pro' to Wave 1?",
        answer: "Criteria: 'Procurement Pro' (ID: 13) was selected for Wave 1 ('Quick Wins') because it has 'Soft' dependencies on the CRM and high 'Cloud Readiness' (85%+). It serves as an ideal pilot for validating the new Landing Zone's integration with external SaaS like SAP Ariba.",
        contextType: 'wave'
    },
    {
        keywords: ['data gravity', 'security audit logs', 'blocker'],
        question: "How does 'Data Gravity' impact the migration of 'Security Audit Logs'?",
        answer: "Data Gravity: With 12TB+ of log volume and a 40% growth rate, 'Security Audit Logs' (ID: 11) cannot be efficiently moved via standard VPN. The plan requires a 'Replatform' to a Cloud-Native SIEM (Splunk Cloud) using a dedicated 10Gbps Direct Connect link to avoid bandwidth-induced migration stalls.",
        contextType: 'risk'
    },
    // --- Data Ingestion & File Upload ---
    {
        keywords: ['upload', 'ingest', 'csv', 'json', 'cmdb'],
        question: "How do I upload my CMDB discovery data for assessment?",
        answer: "Ingestion: You can upload your structured discovery data (CSV or JSON) directly through this interface. The AI will parse your 'App Name', 'Dependencies', and 'Environment' columns to automatically populate the rationalization dashboard. Just click the attachment icon or say 'Process my file'.",
        contextType: 'general'
    },
    {
        keywords: ['bulk upload', 'data extraction', 'xls'],
        question: "Can I perform a bulk upload of 100+ applications at once?",
        answer: "Yes, the platform supports bulk ingestion via the 'Portfolio Upload' template. Upload your Excel or CSV file, and the APR Agent will perform a 'Bulk Assessment', assigning initial risk scores and migration strategies (6Rs) to the entire cohort based on your metadata.",
        contextType: 'general'
    },
    {
        keywords: ['scanned documents', 'upload pdf', 'architecture specs'],
        question: "Can I upload architecture diagrams or PDF specifications for the AI to analyze?",
        answer: "Absolutely. When you upload PDF specs or images of architecture diagrams, the AI Agent uses Vision-to-RPath extraction to identify hidden dependencies and security requirements, enriching the 'Advisory' section of your application assessment automatically.",
        contextType: 'architecture'
    }
];
