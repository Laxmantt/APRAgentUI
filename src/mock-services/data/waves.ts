import { Wave } from '@/types/wave.types';

export const waves: Wave[] = [
    {
        id: 1,
        name: "Wave 1 - Pilot & Foundational",
        description: "Initial migration of foundational services and cloud-ready pilot applications. Focuses on identity, feedback, and mobile foundations.",
        startDate: "2024-01-15",
        endDate: "2024-02-28",
        status: "Completed",
        strategy: "Rehost",
        applications: ["3", "6", "7", "11", "13", "18", "23", "28", "33", "38", "43"],
        dependencies: [
            {
                id: "DEP-101",
                type: "Auth",
                techStack: "SAML 2.0",
                currentEnv: "On-Prem AD",
                targetEnv: "Okta Cloud",
                description: "Single Sign-On integration for all pilot apps",
                criticality: "Critical",
                sourceAppId: "3",
                targetAppId: "EXT-OKTA"
            },
            {
                id: "DEP-102",
                type: "API",
                techStack: "REST/JSON",
                currentEnv: "IIS 10",
                targetEnv: "EKS",
                description: "Mobile App API depends on Foundational Auth",
                criticality: "High",
                sourceAppId: "7",
                targetAppId: "11"
            }
        ],
        externalIntegrations: [
            {
                id: "EXT-101",
                name: "Okta Identity",
                type: "SaaS",
                techStack: "OpenID Connect",
                currentEnv: "External",
                targetEnv: "External",
                description: "Primary Identity Provider",
                criticality: "Critical",
                owner: "Identity Team"
            }
        ],
        dataSources: [
            {
                id: "DS-101",
                name: "Auth Audit DB",
                type: "SQL",
                techStack: "PostgreSQL 14",
                currentEnv: "VM Cluster",
                targetEnv: "Aurora Serverless",
                description: "Audit logs for security compliance",
                criticality: "Medium",
                size: "500GB"
            }
        ],
        infrastructure: [
            {
                id: "INF-101",
                component: "Landing Zone",
                type: "Cloud Infrastructure",
                techStack: "Terraform/AWS",
                currentEnv: "N/A",
                targetEnv: "AWS Region Us-East-1",
                description: "Core network and security foundations",
                criticality: "Critical"
            }
        ],
        risks: [],
        actionPlan: {
            steps: [
                "Establish Cloud Landing Zone and Network Security Groups.",
                "Provision Okta environment and configure AD Connect.",
                "Migrate pilot users to new Identity Provider.",
                "Deploy Mobile API to EKS and run smoke tests."
            ],
            quickWins: [
                "Customer Feedback Tool (SaaS) - immediate switchover.",
                "Mobile App - Low risk API rehost."
            ],
            dependencyRisks: [
                "Ensure Auth Service is stable before moving API consumers."
            ]
        }
    },
    {
        id: 2,
        name: "Wave 2 - Supply Chain & Analytics",
        description: "Migration of the core supply chain and analytics engine. Moderate complexity with significant data migration requirements.",
        startDate: "2024-03-01",
        endDate: "2024-05-15",
        status: "In Progress",
        strategy: "Replatform",
        applications: ["2", "5", "9", "10", "14", "19", "24", "29", "34", "39", "44"],
        dependencies: [
            {
                id: "DEP-201",
                type: "Data Pipeline",
                techStack: "Python/Airflow",
                currentEnv: "On-Prem Cluster",
                targetEnv: "MWAA AWS",
                description: "Analytics Engine consumes data from Inventory snaps",
                criticality: "High",
                sourceAppId: "5",
                targetAppId: "2"
            }
        ],
        externalIntegrations: [
            {
                id: "EXT-201",
                name: "Logistics Partner API",
                type: "Partner API",
                techStack: "SOAP/XML",
                currentEnv: "VPN Tunnel",
                targetEnv: "PrivateLink",
                description: "Real-time shipping rates and tracking",
                criticality: "Medium",
                owner: "Logistics Team"
            }
        ],
        dataSources: [
            {
                id: "DS-201",
                name: "Inventory DB",
                type: "Relational",
                techStack: "MySQL 8.0",
                currentEnv: "Bare Metal",
                targetEnv: "RDS Aurora",
                description: "Master inventory and stock data",
                criticality: "Critical",
                size: "2TB"
            }
        ],
        infrastructure: [
            {
                id: "INF-201",
                component: "Data Lake",
                type: "Storage",
                techStack: "Hadoop to S3",
                currentEnv: "HDFS Cluster",
                targetEnv: "S3/Glue",
                description: "Scalable storage for historical analytics",
                criticality: "High"
            }
        ],
        risks: [],
        actionPlan: {
            steps: [
                "Set up AWS MWAA (Airflow) environment.",
                "Establish PrivateLink with Logistics Partner.",
                "Execute bulk data load from MySQL to Aurora.",
                "Cutover 'Analytics Engine' to new Data Lake."
            ],
            quickWins: [
                "Marketing Dashboards - Decouple from Legacy CRM first."
            ],
            dependencyRisks: [
                "Inventory System migration must precede Analytics switch.",
                "Latency check required for Partner API VPN replacement."
            ]
        }
    },
    {
        id: 3,
        name: "Wave 3 - Critical Legacy & Finance",
        description: "Final wave containing highly complex legacy systems and critical financial payment gateways.",
        startDate: "2024-06-01",
        endDate: "2024-12-30",
        status: "Planning",
        strategy: "Refactor",
        applications: ["1", "4", "8", "12", "15", "20", "25", "30", "35", "40", "45"],
        dependencies: [
            {
                id: "DEP-301",
                type: "MQ",
                techStack: "IBM MQ",
                currentEnv: "Mainframe Gateway",
                targetEnv: "Amazon MQ",
                description: "Payroll bridge to external bank files",
                criticality: "Critical",
                sourceAppId: "8",
                targetAppId: "EXT-BANK"
            }
        ],
        externalIntegrations: [
            {
                id: "EXT-301",
                name: "Banking Network",
                type: "Regulatory",
                techStack: "SWIFT/ISO 20022",
                currentEnv: "MPLS",
                targetEnv: "Direct Connect",
                description: "Electronic Fund Transfer network",
                criticality: "Critical",
                owner: "Finance Team"
            }
        ],
        dataSources: [
            {
                id: "DS-301",
                name: "CRM Database",
                type: "Enterprise DB",
                techStack: "Oracle 19c",
                currentEnv: "Exadata",
                targetEnv: "RDS Oracle",
                description: "Primary Customer and Sales History",
                criticality: "Critical",
                size: "15TB"
            }
        ],
        infrastructure: [
            {
                id: "INF-301",
                component: "Mainframe Bridge",
                type: "Network",
                techStack: "VPN / ExpressRoute",
                currentEnv: "Physical Data Center",
                targetEnv: "Hybrid Cloud Connectivity",
                description: "Critical connectivity to legacy backends",
                criticality: "Critical"
            }
        ],
        risks: [
            {
                id: "RISK-301",
                title: "PCI-DSS Certification Gap",
                description: "Audit required for Payment Gateway in new cloud environment.",
                severity: "Critical",
                probablity: "High",
                impact: "Timeline",
                remediationPlan: "Early engagement with QSA for pre-audit.",
                status: "Open"
            }
        ],
        actionPlan: {
            steps: [
                "Conduct Mainframe dependency analysis workshop.",
                "Build parallel 'Payment Gateway' env in Cloud Secure Enclave.",
                "Perform full-scale performance test on Oracle RDS.",
                "Schedule 'Big Bang' cutover for Finance/Payroll systems."
            ],
            quickWins: [
                "None - High Complexity Wave."
            ],
            dependencyRisks: [
                "Mainframe bridge latency might impact real-time transactions.",
                "PCI compliance audit could delay go-live by 3 months."
            ]
        }
    },
    {
        id: 4,
        name: "Wave 4 - Internal Services & Security",
        description: "Migration of secondary internal tools and non-critical security infrastructure.",
        startDate: "2025-01-15",
        endDate: "2025-03-30",
        status: "Planning",
        strategy: "Replatform",
        applications: ["16", "21", "26", "31", "36", "41"],
        dependencies: [],
        externalIntegrations: [],
        dataSources: [],
        infrastructure: [],
        risks: [],
        actionPlan: {
            steps: ["Security sweep", "Identity provider integration"],
            quickWins: [],
            dependencyRisks: []
        }
    },
    {
        id: 5,
        name: "Wave 5 - Back-office & Archival",
        description: "Final cleanup wave for back-office tools and long-term data archival systems.",
        startDate: "2025-04-01",
        endDate: "2025-06-30",
        status: "Planning",
        strategy: "Retain",
        applications: ["17", "22", "27", "32", "37", "42"],
        dependencies: [],
        externalIntegrations: [],
        dataSources: [],
        infrastructure: [],
        risks: [],
        actionPlan: {
            steps: ["Data archival verification", "Final decommissioning of on-prem boxes"],
            quickWins: [],
            dependencyRisks: []
        }
    }
];
