/* =========================================
   NEXORA NETWORKING
   ========================================= */


/* =========================================
   ELEMENTS
   ========================================= */

const bootScreen =
    document.getElementById("bootScreen");

const introScreen =
    document.getElementById("introScreen");

const levelScreen =
    document.getElementById("levelScreen");

const learningScreen =
    document.getElementById("learningScreen");

const completionScreen =
    document.getElementById("completionScreen");

const enterNetworking =
    document.getElementById("enterNetworking");

const backToRouteMap =
    document.getElementById("backToRouteMap");

const backToIntro =
    document.getElementById("backToIntro");

const backToLevels =
    document.getElementById("backToLevels");

const basicLevel =
    document.getElementById("basicLevel");

const intermediateLevel =
    document.getElementById("intermediateLevel");

const higherLevel =
    document.getElementById("higherLevel");

const studyNumber =
    document.getElementById("studyNumber");

const studyTitle =
    document.getElementById("studyTitle");

const studyDescription =
    document.getElementById("studyDescription");

const studyDetails =
    document.getElementById("studyDetails");

const studyPoints =
    document.getElementById("studyPoints");

const studyTaskName =
    document.getElementById("studyTaskName");

const currentLevelTag =
    document.getElementById("currentLevelTag");

const currentLevelTitle =
    document.getElementById("currentLevelTitle");

const taskLevelName =
    document.getElementById("taskLevelName");

const taskNumber =
    document.getElementById("taskNumber");

const taskTitle =
    document.getElementById("taskTitle");

const conceptUsed =
    document.getElementById("conceptUsed");

const taskDescription =
    document.getElementById("taskDescription");

const hintText =
    document.getElementById("hintText");

const codeEditor =
    document.getElementById("codeEditor");

const feedback =
    document.getElementById("feedback");

const submitBtn =
    document.getElementById("submitBtn");

const clearBtn =
    document.getElementById("clearBtn");

const progressText =
    document.getElementById("progressText");

const levelProgressText =
    document.getElementById("levelProgressText");

const levelProgressBar =
    document.getElementById("levelProgressBar");

const taskDots =
    document.getElementById("taskDots");

const taskMapLevel =
    document.getElementById("taskMapLevel");

const completionTitle =
    document.getElementById("completionTitle");

const completionDescription =
    document.getElementById("completionDescription");

const nextLevelText =
    document.getElementById("nextLevelText");

const continueLevelBtn =
    document.getElementById("continueLevelBtn");

const reviewLevelBtn =
    document.getElementById("reviewLevelBtn");

const basicStatus =
    document.getElementById("basicStatus");

const intermediateStatus =
    document.getElementById("intermediateStatus");

const higherStatus =
    document.getElementById("higherStatus");

const routeTransition =
    document.getElementById("routeTransition");


/* =========================================
   STORAGE
   ========================================= */

const STORAGE_KEY =
    "nexora_networking_levels_v1";


const defaultState = {

    completed: {

        basic: false,

        intermediate: false,

        higher: false

    },

    currentTask: {

        basic: 0,

        intermediate: 0,

        higher: 0

    },

    codes: {

        basic: ["", "", "", "", ""],

        intermediate: ["", "", "", "", ""],

        higher: ["", "", "", "", ""]

    }

};


let state =
    loadState();


function loadState() {

    try {

        const saved =
            localStorage.getItem(
                STORAGE_KEY
            );


        if (!saved) {

            return structuredClone(
                defaultState
            );

        }


        const parsed =
            JSON.parse(saved);


        return {

            ...structuredClone(
                defaultState
            ),

            ...parsed,

            completed: {

                ...defaultState.completed,

                ...(parsed.completed || {})

            },

            currentTask: {

                ...defaultState.currentTask,

                ...(parsed.currentTask || {})

            },

            codes: {

                ...defaultState.codes,

                ...(parsed.codes || {})

            }

        };

    }

    catch (error) {

        console.error(
            "Unable to load saved progress:",
            error
        );


        return structuredClone(
            defaultState
        );

    }

}


function saveState() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state)
    );

}


/* =========================================
   LEVEL DATA
   ========================================= */

const levels = {


    /* =====================================
       BASIC
       ===================================== */

    basic: {

        shortName:
            "BASIC",

        title:
            "NETWORKING BASICS",

        next:
            "intermediate",

        tasks: [

            {

                title:
                    "Build a Simple Network Model",

                concept:
                    "COMPUTER NETWORK",

                studyTitle:
                    "COMPUTER NETWORK",

                studyDescription:
                    "A computer network is a group of connected devices that can communicate and exchange information.",

                studyDetails:
                    "Devices in a network can include laptops, phones, servers, printers and routers. The connection may be wired or wireless. The important idea is that devices communicate by following networking rules and using addressing information.",

                points: [

                    "A network connects two or more devices.",

                    "Devices can send and receive information.",

                    "A router helps connect different networks.",

                    "A server can provide a service to other devices."

                ],

                task:
                    'Create a Python list containing these three devices: "Laptop", "Router", and "Server". Then print the list.',

                hint:
                    'Use a list with square brackets. Example structure: devices = ["Laptop", "Router", "Server"]',

                validate:
                    code => {

                        const lower =
                            code.toLowerCase();


                        return (

                            lower.includes(
                                "laptop"
                            ) &&

                            lower.includes(
                                "router"
                            ) &&

                            lower.includes(
                                "server"
                            ) &&

                            (
                                lower.includes("[") ||

                                lower.includes(
                                    "list("
                                )
                            ) &&

                            lower.includes(
                                "print"
                            )

                        );

                    }

            },


            {

                title:
                    "Work with an IP Address",

                concept:
                    "IP ADDRESS",

                studyTitle:
                    "IP ADDRESS",

                studyDescription:
                    "An IP address identifies a device or network interface so information can be directed to the correct destination.",

                studyDetails:
                    "A common IPv4 address contains four numerical parts separated by dots. For example, 192.168.1.10 has four parts: 192, 168, 1 and 10. In this task, you will separate those parts in Python.",

                points: [

                    "IPv4 addresses contain four parts.",

                    "The parts are separated by dots.",

                    "192.168.1.10 is an example of an IPv4 address.",

                    "Python split() can separate text into parts."

                ],

                task:
                    'Store "192.168.1.10" in a variable named ip. Split it using "." and print the resulting parts.',

                hint:
                    'Use ip.split(".") and store the result in another variable.',

                validate:
                    code => {

                        const lower =
                            code.toLowerCase();


                        return (

                            lower.includes(
                                "192.168.1.10"
                            ) &&

                            lower.includes(
                                ".split"
                            ) &&

                            lower.includes(
                                "print"
                            )

                        );

                    }

            },


            {

                title:
                    "Create a Network Packet",

                concept:
                    "PACKET",

                studyTitle:
                    "PACKETS",

                studyDescription:
                    "Data sent across a network is divided into smaller units called packets.",

                studyDetails:
                    "A packet can carry information such as where the data came from, where it should go, and the actual data being transported. Thinking of a packet as a small structured object helps beginners understand how information moves through a network.",

                points: [

                    "A packet is a small unit of transmitted data.",

                    "Packets have a source and destination.",

                    "A packet can contain data.",

                    "Many packets can make up a larger message."

                ],

                task:
                    'Create a dictionary named packet with the keys "source", "destination" and "data". Give each key a simple value and print the dictionary.',

                hint:
                    'Use a Python dictionary. Example keys: source, destination, data.',

                validate:
                    code => {

                        const lower =
                            code.toLowerCase();


                        return (

                            lower.includes(
                                "packet"
                            ) &&

                            lower.includes(
                                "source"
                            ) &&

                            lower.includes(
                                "destination"
                            ) &&

                            lower.includes(
                                "data"
                            ) &&

                            lower.includes(
                                "{"
                            ) &&

                            lower.includes(
                                "print"
                            )

                        );

                    }

            },


            {

                title:
                    "Model Client and Server",

                concept:
                    "CLIENT & SERVER",

                studyTitle:
                    "CLIENT & SERVER",

                studyDescription:
                    "A client requests a service, while a server provides that service.",

                studyDetails:
                    "For example, a browser can act as a client when requesting a webpage, while a web server provides the webpage. The important relationship is request and response. In this beginner task, we simulate that relationship with Python data instead of connecting to a real system.",

                points: [

                    "The client makes a request.",

                    "The server provides a service.",

                    "A request can contain information about what is needed.",

                    "The response comes from the server."

                ],

                task:
                    'Create a dictionary named request with "client", "server" and "request" fields. Use "Laptop", "WebServer" and "GET /" as their values. Print it.',

                hint:
                    'Create the dictionary first. This is only a local simulation; no real network connection is required.',

                validate:
                    code => {

                        const lower =
                            code.toLowerCase();


                        return (

                            lower.includes(
                                "request"
                            ) &&

                            lower.includes(
                                "client"
                            ) &&

                            lower.includes(
                                "server"
                            ) &&

                            lower.includes(
                                "laptop"
                            ) &&

                            lower.includes(
                                "webserver"
                            ) &&

                            lower.includes(
                                "get"
                            ) &&

                            lower.includes(
                                "print"
                            )

                        );

                    }

            },


            {

                title:
                    "Create a Protocol-Port Table",

                concept:
                    "PROTOCOL & PORT",

                studyTitle:
                    "PROTOCOLS AND PORTS",

                studyDescription:
                    "Protocols define communication rules, while ports identify service endpoints used by applications.",

                studyDetails:
                    "Protocols such as HTTP and HTTPS are used for web communication. A port number helps identify the service endpoint. For example, HTTP is commonly associated with port 80 and HTTPS with port 443. In this task, you will represent this information in a Python dictionary.",

                points: [

                    "A protocol defines communication rules.",

                    "A port identifies a service endpoint.",

                    "HTTP is commonly associated with port 80.",

                    "HTTPS is commonly associated with port 443.",

                    "DNS is commonly associated with port 53."

                ],

                task:
                    'Create a dictionary named ports containing HTTP: 80, HTTPS: 443 and DNS: 53. Print the dictionary.',

                hint:
                    'Use a dictionary with protocol names as keys and numbers as values.',

                validate:
                    code => {

                        const lower =
                            code.toLowerCase();


                        return (

                            lower.includes(
                                "http"
                            ) &&

                            lower.includes(
                                "https"
                            ) &&

                            lower.includes(
                                "dns"
                            ) &&

                            lower.includes(
                                "80"
                            ) &&

                            lower.includes(
                                "443"
                            ) &&

                            lower.includes(
                                "53"
                            ) &&

                            lower.includes(
                                "print"
                            )

                        );

                    }

            }

        ]

    },


    /* =====================================
       INTERMEDIATE
       ===================================== */

    intermediate: {

        shortName:
            "INTERMEDIATE",

        title:
            "NETWORKING INTERMEDIATE",

        next:
            "higher",

        tasks: [

            {

                title:
                    "Create a DNS Lookup Table",

                concept:
                    "DNS",

                studyTitle:
                    "DNS BASICS",

                studyDescription:
                    "DNS translates human-readable domain names into network addresses used by computers.",

                studyDetails:
                    "People prefer names such as example.com, while networking systems use addresses. DNS provides a way to associate a domain name with an address. Here you will simulate that relationship with a Python dictionary.",

                points: [

                    "DNS means Domain Name System.",

                    "DNS uses names that are easier for people to remember.",

                    "A domain can be associated with an IP address.",

                    "A Python dictionary can simulate a DNS table."

                ],

                task:
                    'Create a dictionary named dns_table containing "example.com": "93.184.216.34" and print it.',

                hint:
                    'Use a dictionary where the domain name is the key and the IP address is the value.',

                validate:
                    code => {

                        const lower =
                            code.toLowerCase();


                        return (

                            lower.includes(
                                "dns"
                            ) &&

                            lower.includes(
                                "example.com"
                            ) &&

                            lower.includes(
                                "93.184.216.34"
                            ) &&

                            lower.includes(
                                "{"
                            ) &&

                            lower.includes(
                                "print"
                            )

                        );

                    }

            },


            {

                title:
                    "Simulate an HTTP Request",

                concept:
                    "HTTP",

                studyTitle:
                    "HTTP REQUEST",

                studyDescription:
                    "HTTP is an application-layer protocol commonly used for communication between clients and web servers.",

                studyDetails:
                    "A basic HTTP request can describe an action such as GET, which asks a server for a resource. In this exercise, the request is only represented as Python data; no real website is contacted.",

                points: [

                    "HTTP is used for web communication.",

                    "GET is commonly used to request a resource.",

                    "A request can contain a method and path.",

                    "This exercise is only a local simulation."

                ],

                task:
                    'Create a dictionary named http_request containing method: "GET" and path: "/home". Print it.',

                hint:
                    'Use two dictionary keys: method and path.',

                validate:
                    code => {

                        const lower =
                            code.toLowerCase();


                        return (

                            lower.includes(
                                "http"
                            ) &&

                            lower.includes(
                                "get"
                            ) &&

                            lower.includes(
                                "/home"
                            ) &&

                            lower.includes(
                                "print"
                            )

                        );

                    }

            },


            {

                title:
                    "Compare TCP and UDP",

                concept:
                    "TCP & UDP",

                studyTitle:
                    "TCP AND UDP",

                studyDescription:
                    "TCP and UDP are transport-layer protocols with different approaches to delivering data.",

                studyDetails:
                    "TCP establishes a connection and focuses on reliable, ordered delivery. UDP is connectionless and has less overhead. The choice depends on the communication requirements.",

                points: [

                    "TCP focuses on reliable, ordered delivery.",

                    "UDP is connectionless.",

                    "TCP generally has more communication overhead.",

                    "UDP can be useful where speed and lower overhead matter."

                ],

                task:
                    'Create a Python dictionary comparing TCP and UDP. Include one simple property for each and print the dictionary.',

                hint:
                    'Example idea: TCP → "reliable", UDP → "connectionless".',

                validate:
                    code => {

                        const lower =
                            code.toLowerCase();


                        return (

                            lower.includes(
                                "tcp"
                            ) &&

                            lower.includes(
                                "udp"
                            ) &&

                            lower.includes(
                                "{"
                            ) &&

                            lower.includes(
                                "print"
                            )

                        );

                    }

            },


            {

                title:
                    "Build a Small Routing Table",

                concept:
                    "ROUTING",

                studyTitle:
                    "ROUTING",

                studyDescription:
                    "Routing is the process of deciding where network traffic should be sent to reach its destination.",

                studyDetails:
                    "A routing table can contain destinations and the next step used to reach them. Routers use routing information to forward traffic. Here you will create a simple local representation of a routing table.",

                points: [

                    "Routing decides where traffic should go.",

                    "Routers use routing information.",

                    "A destination can have a next-hop value.",

                    "A dictionary can represent a simple routing table."

                ],

                task:
                    'Create a dictionary named routing_table with "192.168.1.0/24": "192.168.1.1" and print it.',

                hint:
                    'Use the network destination as the key and the next hop as the value.',

                validate:
                    code => {

                        const lower =
                            code.toLowerCase();


                        return (

                            lower.includes(
                                "routing"
                            ) &&

                            lower.includes(
                                "192.168.1.0/24"
                            ) &&

                            lower.includes(
                                "192.168.1.1"
                            ) &&

                            lower.includes(
                                "print"
                            )

                        );

                    }

            },


            {

                title:
                    "Model Network Services",

                concept:
                    "NETWORK SERVICES",

                studyTitle:
                    "NETWORK SERVICES",

                studyDescription:
                    "Different applications use different network services for tasks such as web communication and name resolution.",

                studyDetails:
                    "Networking combines services, protocols and ports. A service can be represented as a record containing its protocol and port. This helps connect earlier concepts into one model.",

                points: [

                    "A service provides a particular network function.",

                    "Services commonly use protocols.",

                    "Services are associated with ports.",

                    "Structured data can represent service information."

                ],

                task:
                    'Create a list named services containing two dictionaries: one for HTTP on port 80 and one for HTTPS on port 443. Print the list.',

                hint:
                    'Use a list containing two dictionaries.',

                validate:
                    code => {

                        const lower =
                            code.toLowerCase();


                        return (

                            lower.includes(
                                "services"
                            ) &&

                            lower.includes(
                                "http"
                            ) &&

                            lower.includes(
                                "https"
                            ) &&

                            lower.includes(
                                "80"
                            ) &&

                            lower.includes(
                                "443"
                            ) &&

                            lower.includes(
                                "["
                            ) &&

                            lower.includes(
                                "{"
                            ) &&

                            lower.includes(
                                "print"
                            )

                        );

                    }

            }

        ]

    },


    /* =====================================
       HIGHER
       ===================================== */

    higher: {

        shortName:
            "ADVANCED",

        title:
            "NETWORKING ADVANCED",

        next:
            null,

        tasks: [

            {

                title:
                    "Calculate IPv4 Address Count",

                concept:
                    "CIDR",

                studyTitle:
                    "CIDR AND PREFIX LENGTH",

                studyDescription:
                    "CIDR notation uses a prefix length to describe how many bits belong to the network portion.",

                studyDetails:
                    "IPv4 addresses contain 32 bits. A prefix such as /24 means 24 bits belong to the network portion, leaving 8 bits for the remaining portion. This task introduces the calculation using Python.",

                points: [

                    "IPv4 contains 32 bits.",

                    "CIDR uses a slash followed by a prefix length.",

                    "The remaining bits can be calculated as 32 minus the prefix.",

                    "Python can calculate powers using **."

                ],

                task:
                    'Write Python code that stores prefix = 24, calculates host_bits = 32 - prefix and calculates total = 2 ** host_bits. Print total.',

                hint:
                    'Use total = 2 ** host_bits.',

                validate:
                    code => {

                        const lower =
                            code.toLowerCase();


                        return (

                            lower.includes(
                                "prefix"
                            ) &&

                            lower.includes(
                                "32"
                            ) &&

                            lower.includes(
                                "24"
                            ) &&

                            lower.includes(
                                "host_bits"
                            ) &&

                            lower.includes(
                                "2 **"
                            ) &&

                            lower.includes(
                                "print"
                            )

                        );

                    }

            },


            {

                title:
                    "Create a Simple Firewall Rule Model",

                concept:
                    "FIREWALL RULES",

                studyTitle:
                    "FIREWALL BASICS",

                studyDescription:
                    "A firewall controls network traffic according to defined rules.",

                studyDetails:
                    "A firewall rule can describe information such as a protocol, a port and an action. In a real system, firewall configurations can be much more detailed. Here you will only model a rule as Python data.",

                points: [

                    "Firewalls control network traffic.",

                    "Rules can specify protocols and ports.",

                    "A rule can allow or deny traffic.",

                    "This exercise is only a local data model."

                ],

                task:
                    'Create a dictionary named rule with protocol: "HTTPS", port: 443 and action: "ALLOW". Print it.',

                hint:
                    'Create three dictionary keys: protocol, port and action.',

                validate:
                    code => {

                        const lower =
                            code.toLowerCase();


                        return (

                            lower.includes(
                                "rule"
                            ) &&

                            lower.includes(
                                "https"
                            ) &&

                            lower.includes(
                                "443"
                            ) &&

                            lower.includes(
                                "allow"
                            ) &&

                            lower.includes(
                                "print"
                            )

                        );

                    }

            },


            {

                title:
                    "Analyze Network Log Entries",

                concept:
                    "NETWORK LOGS",

                studyTitle:
                    "NETWORK LOGS",

                studyDescription:
                    "Network logs record events that can help administrators understand what happened on a system or network.",

                studyDetails:
                    "A log entry can contain an address, service, action or timestamp. Security and network teams can review logs to understand normal and unusual activity. This task uses a small local list instead of real system logs.",

                points: [

                    "Logs store records of events.",

                    "A log may contain an IP address.",

                    "A log may record an action or service.",

                    "Multiple entries can be stored in a list."

                ],

                task:
                    'Create a list named logs containing two simple dictionaries with ip and action fields. Print the list.',

                hint:
                    'Example actions could be "CONNECT" and "REQUEST".',

                validate:
                    code => {

                        const lower =
                            code.toLowerCase();


                        return (

                            lower.includes(
                                "logs"
                            ) &&

                            lower.includes(
                                "ip"
                            ) &&

                            lower.includes(
                                "action"
                            ) &&

                            lower.includes(
                                "["
                            ) &&

                            lower.includes(
                                "{"
                            ) &&

                            lower.includes(
                                "print"
                            )

                        );

                    }

            },


            {

                title:
                    "Model a Network Topology",

                concept:
                    "NETWORK TOPOLOGY",

                studyTitle:
                    "NETWORK TOPOLOGY",

                studyDescription:
                    "Network topology describes how devices and connections are arranged.",

                studyDetails:
                    "Different topologies arrange devices differently. A simple topology can be represented as relationships between devices. This task models a small network without connecting to any real device.",

                points: [

                    "Topology describes network arrangement.",

                    "Devices can have relationships with other devices.",

                    "A list can represent connected devices.",

                    "A dictionary can represent a simple connection map."

                ],

                task:
                    'Create a dictionary named topology where "Router" connects to ["Laptop", "Server"]. Print it.',

                hint:
                    'Use a dictionary with a list as the value.',

                validate:
                    code => {

                        const lower =
                            code.toLowerCase();


                        return (

                            lower.includes(
                                "topology"
                            ) &&

                            lower.includes(
                                "router"
                            ) &&

                            lower.includes(
                                "laptop"
                            ) &&

                            lower.includes(
                                "server"
                            ) &&

                            lower.includes(
                                "["
                            ) &&

                            lower.includes(
                                "{"
                            ) &&

                            lower.includes(
                                "print"
                            )

                        );

                    }

            },


            {

                title:
                    "Build a Network Summary",

                concept:
                    "NETWORK DESIGN",

                studyTitle:
                    "NETWORK DESIGN THINKING",

                studyDescription:
                    "Network design combines devices, addresses, services and communication rules into one organized system.",

                studyDetails:
                    "A simple network model can contain devices, an address and services. Bringing these pieces together helps connect the networking concepts learned in the earlier levels.",

                points: [

                    "Devices form the network structure.",

                    "Addresses identify network endpoints.",

                    "Services use protocols and ports.",

                    "Network design combines several concepts."

                ],

                task:
                    'Create a dictionary named network_summary containing devices, ip and services. Use a list for devices and services, then print the dictionary.',

                hint:
                    'Make a dictionary with three keys: devices, ip and services.',

                validate:
                    code => {

                        const lower =
                            code.toLowerCase();


                        return (

                            lower.includes(
                                "network_summary"
                            ) &&

                            lower.includes(
                                "devices"
                            ) &&

                            lower.includes(
                                "ip"
                            ) &&

                            lower.includes(
                                "services"
                            ) &&

                            lower.includes(
                                "{"
                            ) &&

                            lower.includes(
                                "["
                            ) &&

                            lower.includes(
                                "print"
                            )

                        );

                    }

            }

        ]

    }

};


/* =========================================
   CURRENT LEVEL
   ========================================= */

let currentLevel =
    "basic";


/* =========================================
   BOOT
   ========================================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                bootScreen.classList.add(
                    "hidden"
                );

            },
            1400
        );

    }
);


/* =========================================
   UNIVERSAL SCREEN ZOOM
   ========================================= */

function showScreenWithZoom(
    targetScreen
) {

    const currentScreen =
        document.querySelector(
            ".screen.active"
        );


    if (
        !currentScreen ||
        currentScreen === targetScreen
    ) {

        return;

    }


    /* =========================
       ZOOM CURRENT SCREEN OUT
       ========================= */

    currentScreen.classList.add(
        "zoom-exit"
    );


    setTimeout(
        () => {

            currentScreen.classList.remove(
                "active",
                "zoom-exit"
            );


            /* =========================
               ZOOM NEXT SCREEN IN
               ========================= */

            targetScreen.classList.add(
                "active",
                "zoom-enter"
            );


            void targetScreen.offsetWidth;


            targetScreen.addEventListener(
                "animationend",
                () => {

                    targetScreen.classList.remove(
                        "zoom-enter"
                    );

                },
                {
                    once: true
                }
            );

        },
        600
    );

}


/* =========================================
   INTRO
   ========================================= */

enterNetworking.addEventListener(
    "click",
    () => {

        updateLevelCards();

        showScreenWithZoom(
            levelScreen
        );

    }
);


/* =========================================
   BACK TO INTRO
   ========================================= */

backToIntro.addEventListener(
    "click",
    () => {

        showScreenWithZoom(
            introScreen
        );

    }
);


/* =========================================
   BACK TO CYBER ROUTE MAP
   ========================================= */

backToRouteMap.addEventListener(
    "click",
    () => {

        backToRouteMap.disabled =
            true;


        /* Zoom Networking page out */

        document.body.classList.add(
            "returning-to-map"
        );


        /* Start cinematic transition */

        routeTransition.classList.add(
            "active"
        );


        /* Return after animation */

        setTimeout(
            () => {

                window.location.href =
                    "cyber.html";

            },
            950
        );

    }
);


/* =========================================
   LEVEL AVAILABILITY
   ========================================= */

function isLevelUnlocked(
    level
) {

    if (
        level === "basic"
    ) {

        return true;

    }


    if (
        level === "intermediate"
    ) {

        return state.completed.basic;

    }


    if (
        level === "higher"
    ) {

        return state.completed.intermediate;

    }


    return false;

}


/* =========================================
   UPDATE LEVEL CARDS
   ========================================= */

function updateLevelCards() {

    updateCard(
        basicLevel,
        basicStatus,
        "basic"
    );

    updateCard(
        intermediateLevel,
        intermediateStatus,
        "intermediate"
    );

    updateCard(
        higherLevel,
        higherStatus,
        "higher"
    );

}


function updateCard(
    card,
    statusElement,
    level
) {

    card.classList.remove(
        "locked-level",
        "completed-level",
        "active-level"
    );


    if (
        state.completed[level]
    ) {

        card.classList.add(
            "completed-level"
        );

        statusElement.textContent =
            "✓ COMPLETED";

    }


    else if (
        isLevelUnlocked(level)
    ) {

        card.classList.add(
            "active-level"
        );

        statusElement.textContent =
            "AVAILABLE";

    }


    else {

        card.classList.add(
            "locked-level"
        );

        statusElement.textContent =
            "🔒 LOCKED";

    }

}


/* =========================================
   OPEN LEVEL
   ========================================= */

function openLevel(
    level
) {

    if (
        !isLevelUnlocked(level)
    ) {

        return;

    }


    currentLevel =
        level;


    loadCurrentLevel();


    showScreenWithZoom(
        learningScreen
    );

}


/* =========================================
   LEVEL BUTTONS
   ========================================= */

basicLevel.addEventListener(
    "click",
    () => {

        openLevel(
            "basic"
        );

    }
);


intermediateLevel.addEventListener(
    "click",
    () => {

        openLevel(
            "intermediate"
        );

    }
);


higherLevel.addEventListener(
    "click",
    () => {

        openLevel(
            "higher"
        );

    }
);


/* =========================================
   LOAD CURRENT LEVEL
   ========================================= */

function loadCurrentLevel() {

    const level =
        levels[currentLevel];


    const tasks =
        level.tasks;


    let taskIndex =
        state.currentTask[
            currentLevel
        ];


    if (
        taskIndex >=
        tasks.length
    ) {

        taskIndex = 0;

    }


    currentLevelTag.textContent =
        `${level.shortName} LEVEL`;


    currentLevelTitle.textContent =
        level.title;


    taskLevelName.textContent =
        level.shortName;


    taskMapLevel.textContent =
        level.shortName;


    renderTaskDots();


    renderTask(
        taskIndex
    );

}


/* =========================================
   RENDER TASK
   ========================================= */

function renderTask(
    index
) {

    const level =
        levels[currentLevel];


    const task =
        level.tasks[index];


    state.currentTask[
        currentLevel
    ] =
        index;


    saveState();


    /* STUDY */

    studyNumber.textContent =
        String(
            index + 1
        ).padStart(
            2,
            "0"
        );


    studyTitle.textContent =
        task.studyTitle;


    studyDescription.textContent =
        task.studyDescription;


    studyDetails.textContent =
        task.studyDetails;


    studyPoints.innerHTML =
        "";


    task.points.forEach(
        point => {

            const li =
                document.createElement(
                    "li"
                );


            li.textContent =
                point;


            studyPoints.appendChild(
                li
            );

        }
    );


    studyTaskName.textContent =
        `TASK ${
            String(index + 1)
            .padStart(2, "0")
        }`;


    /* TASK */

    taskNumber.textContent =
        String(
            index + 1
        ).padStart(
            2,
            "0"
        );


    taskTitle.textContent =
        task.title;


    conceptUsed.textContent =
        task.concept;


    taskDescription.textContent =
        task.task;


    hintText.textContent =
        task.hint;


    /* SAVED CODE */

    codeEditor.value =
        state.codes[
            currentLevel
        ][index] || "";


    feedback.textContent =
        "";


    feedback.className =
        "feedback";


    updateProgress(
        index
    );


    renderTaskDots();

}


/* =========================================
   PROGRESS
   ========================================= */

function updateProgress(
    index
) {

    const total =
        levels[
            currentLevel
        ].tasks.length;


    const completedCount =
        index;


    const percent =
        Math.round(
            (
                completedCount /
                total
            ) * 100
        );


    progressText.textContent =
        `${percent}%`;


    levelProgressText.textContent =
        `${completedCount} / ${total}`;


    levelProgressBar.style.width =
        `${percent}%`;

}


/* =========================================
   TASK DOTS
   ========================================= */

function renderTaskDots() {

    const level =
        levels[
            currentLevel
        ];


    const total =
        level.tasks.length;


    const current =
        state.currentTask[
            currentLevel
        ];


    taskDots.innerHTML =
        "";


    for (
        let i = 0;
        i < total;
        i++
    ) {

        const dot =
            document.createElement(
                "div"
            );


        dot.className =
            "task-dot";


        if (
            i < current
        ) {

            dot.classList.add(
                "done"
            );

            dot.textContent =
                "✓";

        }


        else {

            dot.textContent =
                String(
                    i + 1
                );

        }


        if (
            i === current &&
            !state.completed[
                currentLevel
            ]
        ) {

            dot.classList.add(
                "current"
            );

        }


        taskDots.appendChild(
            dot
        );

    }

}


/* =========================================
   SAVE CODE WHILE TYPING
   ========================================= */

codeEditor.addEventListener(
    "input",
    () => {

        const index =
            state.currentTask[
                currentLevel
            ];


        state.codes[
            currentLevel
        ][index] =
            codeEditor.value;


        saveState();

    }
);


/* =========================================
   CLEAR
   ========================================= */

clearBtn.addEventListener(
    "click",
    () => {

        const index =
            state.currentTask[
                currentLevel
            ];


        codeEditor.value =
            "";


        state.codes[
            currentLevel
        ][index] =
            "";


        saveState();


        feedback.textContent =
            "EDITOR CLEARED";


        feedback.className =
            "feedback";

    }
);


/* =========================================
   SUBMIT
   ========================================= */

submitBtn.addEventListener(
    "click",
    () => {

        const index =
            state.currentTask[
                currentLevel
            ];


        const task =
            levels[
                currentLevel
            ].tasks[index];


        const code =
            codeEditor.value.trim();


        if (!code) {

            showFeedback(
                "✕ WRITE YOUR CODE FIRST.",
                "error"
            );

            return;

        }


        let correct =
            false;


        try {

            correct =
                task.validate(
                    code
                );

        }

        catch (error) {

            correct =
                false;

        }


        if (!correct) {

            showFeedback(
                "✕ NOT CORRECT YET — READ THE STUDY PANEL AND TRY AGAIN.",
                "error"
            );

            return;

        }


        showFeedback(
            "✓ CORRECT — NEXT TASK UNLOCKING...",
            "success"
        );


        submitBtn.disabled =
            true;


        setTimeout(
            () => {

                submitBtn.disabled =
                    false;


                moveToNextTask();

            },
            900
        );

    }
);


/* =========================================
   FEEDBACK
   ========================================= */

function showFeedback(
    message,
    type
) {

    feedback.textContent =
        message;


    feedback.className =
        `feedback ${type}`;

}


/* =========================================
   NEXT TASK
   ========================================= */

function moveToNextTask() {

    const total =
        levels[
            currentLevel
        ].tasks.length;


    const current =
        state.currentTask[
            currentLevel
        ];


    const next =
        current + 1;


    state.codes[
        currentLevel
    ][current] =
        codeEditor.value;


    saveState();


    if (
        next >= total
    ) {

        completeLevel();

        return;

    }


    state.currentTask[
        currentLevel
    ] =
        next;


    saveState();


    renderTask(
        next
    );

}


/* =========================================
   COMPLETE LEVEL
   ========================================= */

function completeLevel() {

    state.completed[
        currentLevel
    ] =
        true;


    state.currentTask[
        currentLevel
    ] =
        levels[
            currentLevel
        ].tasks.length;


    saveState();


    const level =
        levels[
            currentLevel
        ];


    completionTitle.textContent =
        `${level.shortName} LEVEL COMPLETE`;


    completionDescription.textContent =
        `You completed all ${level.tasks.length} tasks in the ${level.shortName.toLowerCase()} Networking level.`;


    if (
        level.next
    ) {

        const nextLevel =
            levels[
                level.next
            ];


        nextLevelText.textContent =
            `${nextLevel.shortName} LEVEL UNLOCKED`;


        continueLevelBtn.style.display =
            "inline-flex";


        continueLevelBtn.dataset.nextLevel =
            level.next;

    }


    else {

        nextLevelText.textContent =
            "NETWORKING MODULE COMPLETE";


        continueLevelBtn.style.display =
            "none";

    }


    showScreenWithZoom(
        completionScreen
    );

}


/* =========================================
   CONTINUE TO NEXT LEVEL
   ========================================= */

continueLevelBtn.addEventListener(
    "click",
    () => {

        const nextLevel =
            continueLevelBtn.dataset
                .nextLevel;


        if (
            !nextLevel
        ) {

            updateLevelCards();


            showScreenWithZoom(
                levelScreen
            );


            return;

        }


        openLevel(
            nextLevel
        );

    }
);


/* =========================================
   REVIEW LEVEL
   ========================================= */

reviewLevelBtn.addEventListener(
    "click",
    () => {

        state.currentTask[
            currentLevel
        ] =
            0;


        saveState();


        loadCurrentLevel();


        showScreenWithZoom(
            learningScreen
        );

    }
);


/* =========================================
   BACK TO LEVELS
   ========================================= */

backToLevels.addEventListener(
    "click",
    () => {

        updateLevelCards();


        showScreenWithZoom(
            levelScreen
        );

    }
);


/* =========================================
   CANVAS NETWORK
   ========================================= */

const canvas =
    document.getElementById(
        "networkCanvas"
    );


const ctx =
    canvas.getContext(
        "2d"
    );


let particles =
    [];


function resizeCanvas() {

    canvas.width =
        window.innerWidth;


    canvas.height =
        window.innerHeight;

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


function createParticles() {

    particles =
        [];


    const amount =
        Math.min(
            85,
            Math.floor(
                window.innerWidth / 14
            )
        );


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        particles.push({

            x:
                Math.random() *
                canvas.width,

            y:
                Math.random() *
                canvas.height,

            vx:
                (
                    Math.random() -
                    .5
                ) * .25,

            vy:
                (
                    Math.random() -
                    .5
                ) * .25,

            size:
                Math.random() *
                1.5 +
                .4

        });

    }

}


createParticles();


function drawNetwork() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(
        p => {

            p.x +=
                p.vx;


            p.y +=
                p.vy;


            if (
                p.x < 0 ||
                p.x > canvas.width
            ) {

                p.vx *=
                    -1;

            }


            if (
                p.y < 0 ||
                p.y > canvas.height
            ) {

                p.vy *=
                    -1;

            }


            ctx.beginPath();


            ctx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                "rgba(239,68,68,.7)";


            ctx.fill();

        }
    );


    for (
        let i = 0;
        i < particles.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < particles.length;
            j++
        ) {

            const a =
                particles[i];


            const b =
                particles[j];


            const dx =
                a.x - b.x;


            const dy =
                a.y - b.y;


            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (
                distance < 125
            ) {

                ctx.beginPath();


                ctx.moveTo(
                    a.x,
                    a.y
                );


                ctx.lineTo(
                    b.x,
                    b.y
                );


                ctx.strokeStyle =
                    `rgba(239,68,68,${
                        0.11 *
                        (
                            1 -
                            distance /
                            125
                        )
                    })`;


                ctx.lineWidth =
                    .5;


                ctx.stroke();

            }

        }

    }


    requestAnimationFrame(
        drawNetwork
    );

}


drawNetwork();


/* =========================================
   INITIAL STATE
   ========================================= */

updateLevelCards();


introScreen.classList.add(
    "active"
);


levelScreen.classList.remove(
    "active"
);


learningScreen.classList.remove(
    "active"
);


completionScreen.classList.remove(
    "active"
);