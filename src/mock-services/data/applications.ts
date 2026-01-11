export const applications: any[] = [
    {
        id: '1',
        name: 'Legacy CRM',
        type: 'On-Premise',
        dependencies: ['Database-A', 'Auth-Service-V1'],
        links: [
            { id: 'db-a', name: 'Oracle DB Cluster', type: 'database', direction: 'upstream', strength: 'hard', health: 45, description: 'Core customer data store' },
            { id: '9', name: 'Marketing Dashboards', type: 'internal', direction: 'downstream', strength: 'soft', health: 80 },
            { id: '12', name: 'Customer Support Chatbot', type: 'internal', direction: 'downstream', strength: 'hard', health: 95 }
        ],
        dataGravity: { volumeGB: 2500, complexity: 85, growthRate: 5 },
        trafficIntensity: 88,
        status: 'Assessment Pending',
        complexity: 'High',
        version: 'v4.2.0',
        dataSources: ['Oracle DB', 'CSV Exports'],
        businessComplexity: 'Critical',
        nfrComplexity: 'High',
        regulatoryCompliance: 'GDPR',
        assessment: {
            risk: {
                total: 72,
                breakdown: {
                    technicalComplexity: 85,
                    dataComplexity: 78,
                    securityCompliance: 65,
                    operationalReadiness: 45,
                    vendorDependency: 90,
                    performanceImpact: 70,
                    costRisk: 72
                },
                status: 'derived',
                reasoning: 'High complexity legacy system with significant vendor lock-in and technical debt.'
            },
            strategy: { value: 'Replatform', status: 'derived', reasoning: 'Modernize while preserving logic.' },
            wave: { value: 3, status: 'derived', reasoning: 'Targeted for final wave due to high risk.' },
            dataAvailability: [
                { label: 'Architecture Docs', status: 'partial', value: 'Draft' },
                { label: 'Deployment Specs', status: 'missing' },
                { label: 'Security Logs', status: 'complete', value: 'Audited' }
            ],
            advisory: {
                targetArchitecture: 'Microservices on EKS',
                effortEstimate: '6-9 months',
                assumptions: ['Logic can be decoupled', 'Oracle license transferable'],
                validationGaps: ['Missing API specs for legacy modules']
            }
        },
        genAIProfile: {
            businessPurpose: "Core Customer Relationship Management system handling sales, support, and marketing data.",
            userBase: "Internal Sales & Support, 1200 daily users",
            technicalHealth: 45,
            obsolescenceRisk: 'High',
            cloudReadiness: 40,
            confidence: 85,
            generatedDate: '2024-03-15T10:00:00Z'
        }
    },
    {
        id: '2',
        name: 'Inventory System',
        type: 'On-Premise',
        dependencies: ['Warehouse-DB', 'Logistics-API', 'Inventory-Cache'],
        links: [
            { id: 'db-w', name: 'Warehouse-DB', type: 'database', direction: 'upstream', strength: 'hard', health: 70, description: 'Primary inventory records' },
            { id: '5', name: 'Analytics Engine', type: 'internal', direction: 'downstream', strength: 'soft', health: 85, description: 'Stock level forecasting' },
            { id: 'ext-logistics', name: 'Global Logistics API', type: 'external', direction: 'upstream', strength: 'soft', health: 60, description: 'Shipping provider integration' },
            { id: 'redis-inventory', name: 'Inventory-Cache', type: 'middleware', direction: 'upstream', strength: 'hard', health: 95, description: 'Real-time stock availability cache' }
        ],
        dataGravity: { volumeGB: 850, complexity: 60, growthRate: 12 },
        trafficIntensity: 65,
        status: 'In Progress',
        complexity: 'Medium',
        version: 'v2.1.5',
        dataSources: ['MySQL', 'Redis'],
        businessComplexity: 'Medium',
        nfrComplexity: 'Medium',
        regulatoryCompliance: 'None',
        assessment: {
            risk: {
                total: 55,
                breakdown: {
                    technicalComplexity: 60,
                    dataComplexity: 65,
                    securityCompliance: 40,
                    operationalReadiness: 55,
                    vendorDependency: 30,
                    performanceImpact: 50,
                    costRisk: 85
                },
                status: 'reviewed',
                reasoning: 'Moderate risk due to data dependencies and significant cost implications.'
            },
            strategy: { value: 'Replatform', status: 'reviewed', reasoning: 'Move to managed DB.' },
            wave: { value: 2, status: 'reviewed', reasoning: 'Schedule for mid-migration.' },
            dataAvailability: [
                { label: 'API Specs', status: 'complete', value: 'OpenAPI' },
                { label: 'Data Schema', status: 'complete', value: 'MySQL' },
                { label: 'User Manuals', status: 'partial' }
            ],
            advisory: {
                targetArchitecture: 'Managed RDS + Containerized App',
                effortEstimate: '3-4 months',
                assumptions: ['Standard SQL compatibility', 'Low latency tolerance'],
                validationGaps: []
            }
        },
        genAIProfile: {
            businessPurpose: "Tracks warehouse stock levels and logistics coordination globally.",
            userBase: "Logistics Managers, 300 users",
            technicalHealth: 68,
            obsolescenceRisk: 'Medium',
            cloudReadiness: 75,
            confidence: 92,
            generatedDate: '2024-03-14T15:30:00Z'
        }
    },
    {
        id: '3',
        name: 'HR Portal',
        type: 'Cloud-Native',
        dependencies: ['Okta', 'Workday'],
        links: [
            { id: 'ext-okta', name: 'Okta Auth', type: 'external', direction: 'upstream', strength: 'hard', health: 99 },
            { id: 'ext-workday', name: 'Workday ERP', type: 'external', direction: 'upstream', strength: 'hard', health: 95 }
        ],
        dataGravity: { volumeGB: 120, complexity: 30, growthRate: 2 },
        trafficIntensity: 25,
        status: 'Completed',
        complexity: 'Low',
        version: 'v1.0.2',
        dataSources: ['PostgreSQL', 'S3'],
        businessComplexity: 'High',
        nfrComplexity: 'Low',
        regulatoryCompliance: 'SOX',
        assessment: {
            risk: {
                total: 25,
                breakdown: {
                    technicalComplexity: 20,
                    dataComplexity: 30,
                    securityCompliance: 15,
                    operationalReadiness: 85,
                    vendorDependency: 25,
                    performanceImpact: 20,
                    costRisk: 30
                },
                status: 'approved',
                reasoning: 'Low risk cloud-ready app with high operational readiness.'
            },
            strategy: { value: 'Rehost', status: 'approved', reasoning: 'Simple lift and shift.' },
            wave: { value: 1, status: 'approved', reasoning: 'Ideal pilot application.' },
            dataAvailability: [
                { label: 'Cloud Config', status: 'complete', value: 'Terraform' },
                { label: 'Auth Logs', status: 'complete', value: 'Okta' }
            ],
            advisory: {
                targetArchitecture: 'Cloud Native / Serverless',
                effortEstimate: '1-2 months',
                assumptions: ['Already containerized'],
                validationGaps: []
            }
        },
        genAIProfile: {
            businessPurpose: "Employee self-service portal for benefits and payroll access.",
            userBase: "All Employees, 5000+ users",
            technicalHealth: 95,
            obsolescenceRisk: 'Low',
            cloudReadiness: 98,
            confidence: 99,
            generatedDate: '2024-03-16T09:00:00Z'
        }
    },
    {
        id: '4',
        name: 'Payment Gateway',
        type: 'On-Premise',
        dependencies: ['PCI-Compliance-Service', 'Fraud-Detection-API'],
        links: [
            { id: 'ext-pci', name: 'PCI Compliance Vault', type: 'external', direction: 'upstream', strength: 'hard', health: 90 },
            { id: '11', name: 'Security Audit Logs', type: 'internal', direction: 'downstream', strength: 'hard', health: 85 }
        ],
        dataGravity: { volumeGB: 450, complexity: 95, growthRate: 20 },
        trafficIntensity: 95,
        status: 'In Progress',
        complexity: 'High',
        version: 'v3.5.1',
        dataSources: ['PostgreSQL', 'Redis', 'Kafka'],
        businessComplexity: 'Critical',
        nfrComplexity: 'Critical',
        regulatoryCompliance: 'PCI-DSS',
        assessment: {
            risk: {
                total: 85,
                breakdown: {
                    technicalComplexity: 80,
                    dataComplexity: 75,
                    securityCompliance: 95,
                    operationalReadiness: 60,
                    vendorDependency: 50,
                    performanceImpact: 90,
                    costRisk: 85
                },
                status: 'derived',
                reasoning: 'Critical financial system with extreme security and performance requirements.'
            },
            strategy: { value: 'Refactor', status: 'derived', reasoning: 'Requires cloud security overhaul.' },
            wave: { value: 3, status: 'derived', reasoning: 'High-risk, move after platform is stable.' },
            dataAvailability: [
                { label: 'PCI Docs', status: 'complete', value: 'Certified' },
                { label: 'Threat Model', status: 'complete' }
            ],
            advisory: {
                targetArchitecture: 'Cloud Native Secure Enclave',
                effortEstimate: '6-12 months',
                assumptions: ['Requires fresh PCI audit', 'Tokenization provider available'],
                validationGaps: ['Latency budget validation']
            }
        },
        genAIProfile: {
            businessPurpose: "Processes credit card transactions and manages fraud rules.",
            userBase: "System-to-System, High Volume",
            technicalHealth: 75,
            obsolescenceRisk: 'Medium',
            cloudReadiness: 50,
            confidence: 90,
            generatedDate: '2024-03-12T11:20:00Z'
        }
    },
    {
        id: '5',
        name: 'Analytics Engine',
        type: 'On-Premise',
        dependencies: ['Data-Warehouse', 'Inventory System'],
        links: [
            { id: '2', name: 'Inventory System', type: 'internal', direction: 'upstream', strength: 'soft', health: 80 },
            { id: 'ext-bigquery', name: 'BigQuery Data Lake', type: 'external', direction: 'downstream', strength: 'soft', health: 90 }
        ],
        dataGravity: { volumeGB: 5200, complexity: 90, growthRate: 15 },
        trafficIntensity: 70,
        status: 'Assessment Pending',
        complexity: 'Medium',
        version: 'v2.8.0',
        dataSources: ['Snowflake', 'S3', 'MySQL'],
        businessComplexity: 'Medium',
        nfrComplexity: 'High',
        regulatoryCompliance: 'None',
        assessment: {
            risk: {
                total: 58,
                breakdown: {
                    technicalComplexity: 50,
                    dataComplexity: 90,
                    securityCompliance: 45,
                    operationalReadiness: 65,
                    vendorDependency: 40,
                    performanceImpact: 75,
                    costRisk: 60
                },
                status: 'reviewed',
                reasoning: 'Data-intensive migration risk with high performance demands.'
            },
            strategy: { value: 'Replatform', status: 'reviewed', reasoning: 'Modernize data layer.' },
            wave: { value: 2, status: 'reviewed', reasoning: 'Schedule with inventory system.' },
            dataAvailability: [
                { label: 'Data Dictionary', status: 'complete', value: 'Snowflake' },
                { label: 'ETL Pipelines', status: 'partial' }
            ],
            advisory: {
                targetArchitecture: 'Cloud Data Warehouse (Snowflake on Azure)',
                effortEstimate: '4-5 months',
                assumptions: ['Direct connect available'],
                validationGaps: ['Data ingress costs estimation']
            }
        },
        genAIProfile: {
            businessPurpose: "Business Intelligence and predictive modeling engine.",
            userBase: "Data Scientists & Execs, 50 users",
            technicalHealth: 82,
            obsolescenceRisk: 'Low',
            cloudReadiness: 85,
            confidence: 88,
            generatedDate: '2024-03-13T14:45:00Z'
        }
    },
    {
        id: '6',
        name: 'Customer Feedback Tool',
        type: 'SaaS',
        dependencies: ['Auth-Service-V1'],
        links: [
            { id: 'ext-zendesk', name: 'Zendesk SDK', type: 'external', direction: 'upstream', strength: 'soft', health: 95 }
        ],
        dataGravity: { volumeGB: 45, complexity: 20, growthRate: 8 },
        trafficIntensity: 15,
        status: 'Completed',
        complexity: 'Low',
        version: 'v1.2.0',
        dataSources: ['PostgreSQL'],
        businessComplexity: 'Low',
        nfrComplexity: 'Low',
        regulatoryCompliance: 'GDPR',
        assessment: {
            risk: {
                total: 15,
                breakdown: {
                    technicalComplexity: 10,
                    dataComplexity: 15,
                    securityCompliance: 20,
                    operationalReadiness: 95,
                    vendorDependency: 80,
                    performanceImpact: 10,
                    costRisk: 15
                },
                status: 'approved',
                reasoning: 'Minimal footprint SaaS with high operational readiness.'
            },
            strategy: { value: 'Retain', status: 'approved', reasoning: 'Keep on current SaaS.' },
            wave: { value: 1, status: 'approved', reasoning: 'No migration effort.' },
            dataAvailability: [
                { label: 'Vendor SLA', status: 'complete', value: '99.9%' }
            ],
            advisory: {
                targetArchitecture: 'SaaS (No Change)',
                effortEstimate: '0 months',
                assumptions: ['Contract renews automatically'],
                validationGaps: []
            }
        },
        genAIProfile: {
            businessPurpose: "Customer feedback collection and ticket routing.",
            userBase: "External Users, Variable Load",
            technicalHealth: 90,
            obsolescenceRisk: 'Low',
            cloudReadiness: 100,
            confidence: 95,
            generatedDate: '2024-03-10T11:00:00Z'
        }
    },
    {
        id: '7',
        name: 'Mobile App API',
        type: 'Cloud-Native',
        dependencies: ['Firebase', 'Auth-Service-V1'],
        links: [
            { id: 'ext-firebase', name: 'Firebase Messaging', type: 'external', direction: 'upstream', strength: 'soft', health: 98 }
        ],
        dataGravity: { volumeGB: 210, complexity: 40, growthRate: 30 },
        trafficIntensity: 85,
        status: 'In Progress',
        complexity: 'Medium',
        version: 'v5.1.0',
        dataSources: ['Firestore', 'Redis'],
        businessComplexity: 'High',
        nfrComplexity: 'Medium',
        regulatoryCompliance: 'None',
        assessment: {
            risk: {
                total: 35,
                breakdown: {
                    technicalComplexity: 30,
                    dataComplexity: 40,
                    securityCompliance: 35,
                    operationalReadiness: 80,
                    vendorDependency: 20,
                    performanceImpact: 45,
                    costRisk: 40
                },
                status: 'derived',
                reasoning: 'Mobile foundation readiness with moderate scaling risk.'
            },
            strategy: { value: 'Rehost', status: 'derived', reasoning: 'Standard cloud transition.' },
            wave: { value: 1, status: 'derived', reasoning: 'Foundational API for Wave 1.' },
            dataAvailability: [
                { label: 'Endpoint List', status: 'complete', value: 'v5' }
            ],
            advisory: {
                targetArchitecture: 'API Gateway + Lambda',
                effortEstimate: '2-3 months',
                assumptions: ['Stateless architecture compatible'],
                validationGaps: ['Perf testing at scale']
            }
        },
        genAIProfile: {
            businessPurpose: "Backend API for consumer-facing mobile application.",
            userBase: "Mobile Users, 100k+ MAU",
            technicalHealth: 88,
            obsolescenceRisk: 'Low',
            cloudReadiness: 90,
            confidence: 94,
            generatedDate: '2024-03-15T16:20:00Z'
        }
    },
    {
        id: '8',
        name: 'Legacy Payroll',
        type: 'On-Premise',
        dependencies: ['Mainframe-Gateway'],
        links: [
            { id: ' mainframe-gw', name: 'Mainframe COBOL Gateway', type: 'middleware', direction: 'upstream', strength: 'hard', health: 30 },
            { id: 'db-payroll', name: 'DB2 Payroll History', type: 'database', direction: 'upstream', strength: 'hard', health: 50 }
        ],
        dataGravity: { volumeGB: 8500, complexity: 95, growthRate: 1 },
        trafficIntensity: 40,
        status: 'Assessment Pending',
        complexity: 'High',
        version: 'v8.4.2',
        dataSources: ['DB2', 'Files'],
        businessComplexity: 'Critical',
        nfrComplexity: 'Critical',
        regulatoryCompliance: 'SOX',
        assessment: {
            risk: {
                total: 92,
                breakdown: {
                    technicalComplexity: 95,
                    dataComplexity: 88,
                    securityCompliance: 90,
                    operationalReadiness: 30,
                    vendorDependency: 95,
                    performanceImpact: 85,
                    costRisk: 92
                },
                status: 'pending',
                reasoning: 'Extreme risk due to mainframe dependencies and critical business impact.'
            },
            strategy: { value: 'Retire', status: 'pending', reasoning: 'Recommend decommissioning or replacement.' },
            wave: { value: 3, status: 'pending', reasoning: 'Long-term migration/replacement.' },
            dataAvailability: [
                { label: 'Mainframe Schema', status: 'missing' },
                { label: 'Legacy Codebase', status: 'partial', value: 'COBOL' }
            ],
            advisory: {
                targetArchitecture: 'Retire / Replace with SaaS HCM',
                effortEstimate: '18-24 months',
                assumptions: ['Data extraction possible'],
                validationGaps: ['Business logic documentation missing']
            }
        },
        genAIProfile: {
            businessPurpose: "Critical payroll processing and historical record keeping.",
            userBase: "HR & Finance Admin, 20 users",
            technicalHealth: 20,
            obsolescenceRisk: 'Critical',
            cloudReadiness: 10,
            confidence: 98,
            generatedDate: '2024-03-01T08:00:00Z'
        }
    },
    {
        id: '9',
        name: 'Marketing Dashboards',
        type: 'On-Premise',
        dependencies: ['Google-Ads-API', 'Legacy CRM'],
        links: [
            { id: '1', name: 'Legacy CRM', type: 'internal', direction: 'upstream', strength: 'soft', health: 85 }
        ],
        dataGravity: { volumeGB: 600, complexity: 55, growthRate: 25 },
        trafficIntensity: 50,
        status: 'In Progress',
        complexity: 'Medium',
        version: 'v2.0.1',
        dataSources: ['MySQL', 'Redshift'],
        businessComplexity: 'Low',
        nfrComplexity: 'Medium',
        regulatoryCompliance: 'None',
        assessment: {
            risk: {
                total: 48,
                breakdown: {
                    technicalComplexity: 45,
                    dataComplexity: 55,
                    securityCompliance: 30,
                    operationalReadiness: 70,
                    vendorDependency: 60,
                    performanceImpact: 40,
                    costRisk: 50
                },
                status: 'reviewed',
                reasoning: 'Risk primarily centered around external marketing API stability.'
            },
            strategy: { value: 'Replatform', status: 'reviewed', reasoning: 'Move to managed DB.' },
            wave: { value: 2, status: 'reviewed', reasoning: 'Mid-term migration goal.' },
            dataAvailability: [
                { label: 'API Keys', status: 'complete' }
            ],
            advisory: {
                targetArchitecture: 'Containerized Web App',
                effortEstimate: '3 months',
                assumptions: ['Can share DB session state'],
                validationGaps: []
            }
        },
        genAIProfile: {
            businessPurpose: "Visualization of marketing campaign performance.",
            userBase: "Marketing Team, 50 users",
            technicalHealth: 60,
            obsolescenceRisk: 'Medium',
            cloudReadiness: 70,
            confidence: 88,
            generatedDate: '2024-03-14T09:30:00Z'
        }
    },
    {
        id: '10',
        name: 'Partner Portal',
        type: 'On-Premise',
        dependencies: ['Auth-Service-V1'],
        links: [
            { id: 'ext-partner-vpn', name: 'Partner Site-to-Site VPN', type: 'external', direction: 'upstream', strength: 'hard', health: 75 }
        ],
        dataGravity: { volumeGB: 320, complexity: 40, growthRate: 10 },
        trafficIntensity: 35,
        status: 'Assessment Pending',
        complexity: 'Medium',
        version: 'v3.2.0',
        dataSources: ['PostgreSQL'],
        businessComplexity: 'Medium',
        nfrComplexity: 'Medium',
        regulatoryCompliance: 'GDPR',
        assessment: {
            risk: {
                total: 42,
                breakdown: {
                    technicalComplexity: 40,
                    dataComplexity: 35,
                    securityCompliance: 80,
                    operationalReadiness: 75,
                    vendorDependency: 20,
                    performanceImpact: 30,
                    costRisk: 40
                },
                status: 'derived',
                reasoning: 'Security focus required due to external partner access.'
            },
            strategy: { value: 'Repurchase', status: 'derived', reasoning: 'SaaS replacement recommended.' },
            wave: { value: 2, status: 'derived', reasoning: 'Early phase of core migration.' },
            dataAvailability: [
                { label: 'Security Scan', status: 'complete', value: 'Pass' }
            ],
            advisory: {
                targetArchitecture: 'Replace with Vendor Portal SaaS',
                effortEstimate: '4-5 months',
                assumptions: ['Standard partner onboarding flow'],
                validationGaps: ['Custom integration mapping']
            }
        },
        genAIProfile: {
            businessPurpose: "Secure gateway for 3rd party supply chain partners.",
            userBase: "External Partners, 500 users",
            technicalHealth: 55,
            obsolescenceRisk: 'Medium',
            cloudReadiness: 60,
            confidence: 85,
            generatedDate: '2024-03-12T13:00:00Z'
        }
    },
    {
        id: '11',
        name: 'Security Audit Logs',
        type: 'On-Premise',
        dependencies: ['Auth-Service-V1'],
        links: [
            { id: '4', name: 'Payment Gateway', type: 'internal', direction: 'upstream', strength: 'hard', health: 95 }
        ],
        dataGravity: { volumeGB: 12000, complexity: 85, growthRate: 40 },
        trafficIntensity: 90,
        status: 'Assessment Pending',
        complexity: 'Medium',
        version: 'v1.1.0',
        dataSources: ['Syslog', 'ELK'],
        businessComplexity: 'High',
        nfrComplexity: 'High',
        regulatoryCompliance: 'PCI-DSS',
        assessment: {
            risk: {
                total: 65,
                breakdown: {
                    technicalComplexity: 60,
                    dataComplexity: 85,
                    securityCompliance: 90,
                    operationalReadiness: 65,
                    vendorDependency: 30,
                    performanceImpact: 80,
                    costRisk: 70
                },
                status: 'pending',
                reasoning: 'High risk due to critical security data and volume/performance requirements.'
            },
            strategy: { value: 'Replatform', status: 'pending', reasoning: 'Cloud logging scalability.' },
            wave: { value: 1, status: 'pending', reasoning: 'Security foundation requirement.' },
            dataAvailability: [
                { label: 'Log Format', status: 'complete', value: 'JSON' }
            ],
            advisory: {
                targetArchitecture: 'Cloud Native SIEM / Splunk Cloud',
                effortEstimate: '2-3 months',
                assumptions: ['Bandwidth sufficient for ingestion'],
                validationGaps: []
            }
        },
        genAIProfile: {
            businessPurpose: "Centralized logging for security compliance and auditing.",
            userBase: "Security Ops Center, 10 users",
            technicalHealth: 80,
            obsolescenceRisk: 'Low',
            cloudReadiness: 90,
            confidence: 92,
            generatedDate: '2024-03-15T10:00:00Z'
        }
    },
    {
        id: '12',
        name: 'Customer Support Chatbot',
        type: 'Cloud-Native',
        dependencies: ['Legacy CRM', 'OpenAI'],
        links: [
            { id: '1', name: 'Legacy CRM', type: 'internal', direction: 'upstream', strength: 'hard', health: 80 },
            { id: 'ext-openai', name: 'OpenAI API v4', type: 'external', direction: 'upstream', strength: 'soft', health: 99 }
        ],
        dataGravity: { volumeGB: 50, complexity: 25, growthRate: 15 },
        trafficIntensity: 55,
        status: 'In Progress',
        complexity: 'Low',
        version: 'v2.3.0',
        dataSources: ['CosmosDB'],
        businessComplexity: 'Medium',
        nfrComplexity: 'Low',
        regulatoryCompliance: 'None',
        assessment: {
            risk: {
                total: 25,
                breakdown: {
                    technicalComplexity: 30,
                    dataComplexity: 20,
                    securityCompliance: 25,
                    operationalReadiness: 90,
                    vendorDependency: 40,
                    performanceImpact: 20,
                    costRisk: 25
                },
                status: 'reviewed',
                reasoning: 'Low risk modern app leverages cloud-native services.'
            },
            strategy: { value: 'Rehost', status: 'reviewed', reasoning: 'Simple cloud transition.' },
            wave: { value: 3, status: 'reviewed', reasoning: 'Scheduled with CRM dependency.' },
            dataAvailability: [
                { label: 'API Specs', status: 'complete', value: 'OpenAPI v4' }
            ],
            advisory: {
                targetArchitecture: 'Serverless Functions + AI Service',
                effortEstimate: '1 month',
                assumptions: ['No state persistence required'],
                validationGaps: []
            }
        },
        genAIProfile: {
            businessPurpose: "Automated L1 support for customer queries.",
            userBase: "Public, High Volume",
            technicalHealth: 92,
            obsolescenceRisk: 'Low',
            cloudReadiness: 100,
            confidence: 96,
            generatedDate: '2024-03-16T11:00:00Z'
        }
    },
    // Adding 33 more apps to reach 45 total for demo
    ...Array.from({ length: 33 }, (_, i) => {
        const id = (i + 13).toString();
        const names = [
            'Procurement Pro', 'Legal Discovery Tool', 'Data Archive 2022', 'Email Marketing V2',
            'Identity Hub', 'Employee Recognition', 'Sales Forecasting', 'Resource Planner',
            'Travel Booking', 'Expense Manager', 'Ticketing System', 'Internal Wiki',
            'Learning Management', 'Asset Tracker', 'Network Monitoring', 'Log Analyzer',
            'Compliance Checker', 'Vendor Portal', 'Budget Planner', 'Tax Calculator',
            'Audit Logger', 'Notification Engine', 'Shortlink Service', 'Image Processor',
            'Video Streamer', 'Code Quality Checker', 'Security Scanner', 'Mobile Gateway',
            'API Connector', 'Data Sync Tool', 'Cache Manager', 'Metrics Collector', 'Backup Service'
        ];
        const types = ['On-Premise', 'Cloud-Native', 'SaaS', 'Hybrid'];
        const statuses = ['Completed', 'In Progress', 'Assessment Pending', 'Approved', 'Retirement Planned'];
        const strategies = ['Rehost', 'Replatform', 'Refactor', 'Retain', 'Retire'];
        const complexities = ['Low', 'Medium', 'High'];

        const type = types[i % types.length];
        const status = statuses[i % statuses.length];
        const strategy = strategies[i % strategies.length];
        const complexity = complexities[i % complexities.length];

        return {
            id,
            name: names[i] || `Enterprise App ${id}`,
            type,
            status,
            complexity,
            businessComplexity: complexity,
            nfrComplexity: complexity,
            regulatoryCompliance: i % 3 === 0 ? 'GDPR' : 'None',
            version: 'v1.0.0',
            trafficIntensity: Math.floor(Math.random() * 100),
            dataSources: ['Legacy DB'],
            dependencies: [],
            links: i === 0 ? [
                { id: '1', name: 'Legacy CRM', type: 'internal', direction: 'upstream', strength: 'soft', health: 85, description: 'Master customer data feed' },
                { id: 'db-proc', name: 'Postgres Procurement DB', type: 'database', direction: 'upstream', strength: 'hard', health: 90, description: 'Order and vendor transaction store' },
                { id: 'ext-sap', name: 'SAP Ariba', type: 'external', direction: 'downstream', strength: 'soft', health: 75, description: 'Vendor management integration' }
            ] : i === 1 ? [
                { id: '8', name: 'Legacy Payroll', type: 'internal', direction: 'upstream', strength: 'hard', health: 40, description: 'Employee contract metadata' },
                { id: 'ext-docusign', name: 'DocuSign API', type: 'external', direction: 'downstream', strength: 'soft', health: 95, description: 'Legal document signature workflow' },
                { id: 'db-legal', name: 'Elasticsearch Discovery Cluster', type: 'database', direction: 'upstream', strength: 'hard', health: 80, description: 'Full-text searchable legal archives' }
            ] : i === 2 ? [
                { id: 'db-arch', name: 'Glacier Cold Storage', type: 'database', direction: 'downstream', strength: 'hard', health: 60, description: 'Historical data archive' },
                { id: 'ext-aws-s3', name: 'AWS S3 (Compliance Bucket)', type: 'external', direction: 'downstream', strength: 'hard', health: 99, description: 'Immutable log storage' }
            ] : [],
            dataGravity: { volumeGB: Math.floor(Math.random() * 1000), complexity: Math.floor(Math.random() * 100), growthRate: Math.floor(Math.random() * 20) },
            assessment: {
                risk: { total: Math.floor(Math.random() * 80) + 10, status: 'derived' },
                strategy: { value: strategy, status: 'derived' },
                wave: { value: (i % 5) + 1, status: 'derived' },
                dataAvailability: [
                    { label: 'Architecture Docs', status: 'partial' }
                ],
                advisory: {
                    targetArchitecture: 'Cloud Native',
                    effortEstimate: '3-6 months',
                    assumptions: [],
                    validationGaps: []
                }
            },
            genAIProfile: {
                businessPurpose: `Enterprise capability for ${names[i] || 'Business Unit ' + id}.`,
                technicalHealth: Math.floor(Math.random() * 60) + 40,
                obsolescenceRisk: i % 4 === 0 ? 'High' : 'Low',
                cloudReadiness: Math.floor(Math.random() * 50) + 50
            }
        };
    })
];
