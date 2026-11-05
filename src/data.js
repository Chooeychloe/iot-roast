export const pick = (items) => items[Math.floor(Math.random() * items.length)];
export const shuffle = (items) => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const IOT_MODULE_TOPICS = [
  "IoT Module 5: Web and Cloud of Things",
  "IoT Module 6: Data Visualization",
  "IoT Module 7: Security, Ethics & Privacy",
  "IoT Module 8: System Design & Development",
];

export const QUESTIONS = [
  { topic: IOT_MODULE_TOPICS[0], q: "What is the Web of Things (WoT)?", o: ["Web of Things resource interfaces", "Cloud of Things data storage", "A local serial monitor only", "A device-specific radio protocol"], a: 0, e: "The Web of Things applies web standards such as URLs and HTTP/REST to IoT devices and their resources." },
  { topic: IOT_MODULE_TOPICS[0], q: "What capabilities does a Cloud of Things platform provide?", o: ["Cloud storage and dashboards", "A local web page without history", "A serial log on the ESP32", "A sensor with a longer cable"], a: 0, e: "Cloud of Things platforms can store historical readings and make dashboards accessible remotely." },
  { topic: IOT_MODULE_TOPICS[0], q: "What is the purpose of a ThingSpeak Write API Key?", o: ["The channel's Write API Key", "The channel's Read API Key", "The dashboard's browser key", "The broker's MQTT topic name"], a: 0, e: "The Write API Key authorizes updates to a private ThingSpeak channel; read access uses the Read API Key." },
  { topic: IOT_MODULE_TOPICS[0], q: "What is the role of an MQTT broker in publish-subscribe communication?", o: ["Routes the message to clients subscribed to that topic", "Stores every message as a permanent chart", "Converts the message into an HTTP endpoint", "Changes the sensor value before delivery"], a: 0, e: "MQTT publishers send messages to a broker, which forwards them to clients subscribed to the matching topic." },
  { topic: IOT_MODULE_TOPICS[0], q: "What does the BLYNK_WRITE(V1) callback handle?", o: ["BLYNK_WRITE(V1)", "BLYNK_READ(V1)", "BLYNK_SEND(V1)", "BLYNK_EVENT(V1)"], a: 0, e: "BLYNK_WRITE(V1) is called when the Blynk server sends a new value for virtual pin V1." },
  { topic: IOT_MODULE_TOPICS[1], q: "Which visualization is suited to show how a measurement changes over time?", o: ["A line chart over time", "A gauge for the current value", "An indicator for an on/off state", "A text label for one reading"], a: 0, e: "A line chart makes changes over time visible, which suits a 24-hour temperature history." },
  { topic: IOT_MODULE_TOPICS[1], q: "Which visualization is suited to show a current value within a defined range?", o: ["A gauge with a meaningful range", "A line chart with no time axis", "A toggle that changes the reading", "A bar chart for unrelated rooms"], a: 0, e: "A gauge is suited to one current value within a known range, with units and sensible minimum and maximum values." },
  { topic: IOT_MODULE_TOPICS[1], q: "What principle should guide the refresh frequency of an IoT dashboard?", o: ["Choose an update rate that matches the sensor's change", "Refresh even faster to make every value look live", "Add more colors to explain the frequent updates", "Replace the temperature sensor with a chart"], a: 0, e: "Dashboard refresh frequency should match how quickly the measured value changes; unnecessary updates add noise." },
  { topic: IOT_MODULE_TOPICS[1], q: "What is hysteresis in a threshold-based alert?", o: ["Use separate thresholds to activate and clear the alert", "Send a notification for every sensor reading", "Remove the alert's upper temperature threshold", "Refresh the dashboard more often"], a: 0, e: "Hysteresis uses a higher activation threshold and a lower clearing threshold to stop alerts flickering near one value." },
  { topic: IOT_MODULE_TOPICS[1], q: "What is a key characteristic of an on-device alert?", o: ["An on-device alert controlled by the ESP32", "A cloud push notification on the phone", "An email sent by the cloud platform", "A dashboard widget that changes color"], a: 0, e: "An on-device buzzer or LED can respond locally without internet access; cloud notifications cannot." },
  { topic: IOT_MODULE_TOPICS[2], q: "What is the appropriate first response when IoT credentials are exposed?", o: ["Revoke or regenerate the exposed credentials", "Hide the repository but keep using the keys", "Delete the commit and assume the keys are safe", "Print the credentials only in the serial log"], a: 0, e: "Once credentials are exposed, regenerate or revoke them; removing a commit does not guarantee nobody copied the old values." },
  { topic: IOT_MODULE_TOPICS[2], q: "What security property does TLS provide for data in transit?", o: ["Use HTTPS or MQTT over TLS with certificate checks", "Use HTTP and encode the values as JSON", "Rename the Wi-Fi network before each upload", "Hide the chart from the dashboard menu"], a: 0, e: "TLS encrypts data in transit; validating the server certificate also helps confirm the device is talking to the intended server." },
  { topic: IOT_MODULE_TOPICS[2], q: "What does data minimization require in an IoT system?", o: ["Stop collecting presence data that is not needed", "Keep every reading forever for future analysis", "Share the raw log with every dashboard user", "Collect more detail before deciding its purpose"], a: 0, e: "Data minimization means collecting only information needed for the stated purpose." },
  { topic: IOT_MODULE_TOPICS[2], q: "Which practices support ethical collection of data in public IoT systems?", o: ["Explain the collection and set public limits on its use", "Keep the collection secret to avoid complaints", "Store all recordings indefinitely by default", "Give the vendor sole control over the data"], a: 0, e: "Transparency, public oversight, consent where appropriate, and limited collection help address the impact on people." },
  { topic: IOT_MODULE_TOPICS[2], q: "Why are default credentials a security risk for IoT devices?", o: ["An attacker may take control using weak credentials", "A dashboard may round its readings too early", "A line chart may display the wrong time range", "A sensor may publish to the wrong visual widget"], a: 0, e: "Default credentials make devices easier to compromise and can contribute to botnets or unauthorized access." },
  { topic: IOT_MODULE_TOPICS[3], q: "What is the purpose of requirement analysis in IoT system development?", o: ["Define the problem, users, requirements, and constraints", "Choose a cloud dashboard color scheme", "Wire every sensor before deciding the goal", "Write the final presentation before the design"], a: 0, e: "Requirement analysis defines the problem, users, functional and non-functional needs, and constraints before design begins." },
  { topic: IOT_MODULE_TOPICS[3], q: "What is a functional requirement in an IoT system?", o: ["A measurable functional requirement", "A hardware budget constraint", "A non-functional battery target", "A dashboard layout preference"], a: 0, e: "It specifies observable behavior the system must perform, so it is a functional requirement." },
  { topic: IOT_MODULE_TOPICS[3], q: "What does an IoT system block diagram communicate?", o: ["Sensors, ESP32, protocol, cloud, and dashboard", "Only the dashboard colors and page titles", "The team schedule and presentation rubric", "A list of source files without data flow"], a: 0, e: "A block diagram should show the main components and the data path from sensors through the controller and network to the cloud and user." },
  { topic: IOT_MODULE_TOPICS[3], q: "Which design principle helps an IoT system continue operating during a network outage?", o: ["Keep the pump control loop local and make uploads non-blocking", "Require a cloud response before every pump decision", "Pause sensor reads until Wi-Fi reconnects", "Move the pump threshold into the dashboard only"], a: 0, e: "Local sensing and control should continue during a network outage; cloud uploads can retry separately without blocking the control loop." },
  { topic: IOT_MODULE_TOPICS[3], q: "What characterizes a functional test of an IoT system?", o: ["Apply readings below and above the thresholds and record pump state", "Check that the project title appears in the report", "Count the number of widgets on the dashboard", "Confirm the ESP32 restarts after every reading"], a: 0, e: "A functional test checks expected sensor and actuator behavior under defined conditions and records the result." },
  { topic: IOT_MODULE_TOPICS[0], q: "What is the purpose of a Web Thing Description?", o: ["A machine-readable description of a Thing and its interaction affordances", "A permanent log of every sensor reading", "A wireless encryption algorithm", "A dashboard color configuration"], a: 0, e: "A Thing Description provides metadata and interaction affordances so clients can discover and use a Web Thing." },
  { topic: IOT_MODULE_TOPICS[0], q: "What is HTTP POST typically used for in an IoT web integration?", o: ["Submitting data to a resource identified by a URL", "Subscribing to every MQTT topic", "Changing a physical sensor", "Creating a local-only serial connection"], a: 0, e: "HTTP POST commonly sends data to a web resource; the service API defines how it is processed." },
  { topic: IOT_MODULE_TOPICS[0], q: "Which statement describes both a capability and a dependency of the Cloud of Things?", o: ["It enables remote services and shared data but depends on network availability", "It guarantees local control during every network outage", "It removes the need to secure device credentials", "It automatically fixes inaccurate sensor readings"], a: 0, e: "Cloud services support remote access and shared storage, while connectivity and service availability remain dependencies." },
  { topic: IOT_MODULE_TOPICS[1], q: "Why are labels and units important in IoT data visualization?", o: ["They provide context so viewers can interpret values correctly", "They encrypt readings before storage", "They guarantee every sensor is accurate", "They remove the need for timestamps"], a: 0, e: "Labels and units explain what a measurement represents and help prevent misinterpretation." },
  { topic: IOT_MODULE_TOPICS[1], q: "Why should sensor data be validated before it is interpreted?", o: ["To identify missing, corrupted, or implausible readings", "To make every reading match the average", "To remove all unusual but valid events", "To replace the sensor with a dashboard"], a: 0, e: "Validation helps distinguish meaningful measurements from faults, missing values, and transmission errors." },
  { topic: IOT_MODULE_TOPICS[1], q: "Which visualization principle supports fair comparisons between data sets?", o: ["Use consistent units, time periods, and scales", "Give each series an unrelated scale", "Remove labels and timestamps", "Use color as the only distinction"], a: 0, e: "Consistent units, periods, and scales make comparisons meaningful and less misleading." },
  { topic: IOT_MODULE_TOPICS[1], q: "What context should accompany a displayed IoT metric?", o: ["The metric name, unit, and relevant time context", "Animation and extra decimal places only", "The device password", "A different scale for every update"], a: 0, e: "A metric needs a clear label and unit, and often a timestamp or time range, to be understood." },
  { topic: IOT_MODULE_TOPICS[2], q: "What does the principle of least privilege mean for IoT network access?", o: ["Allow only the connections and permissions required for the device function", "Expose every device port to the public internet", "Share one administrator credential across devices", "Disable authentication to simplify setup"], a: 0, e: "Least privilege limits access to what is necessary, reducing the impact of mistakes and compromise." },
  { topic: IOT_MODULE_TOPICS[2], q: "Which privacy principles limit unnecessary IoT data collection and its use?", o: ["Purpose limitation and data minimization", "Indefinite retention and broad sharing", "Secret collection and unrestricted reuse", "Maximum collection before defining a purpose"], a: 0, e: "Collect only data needed for a defined purpose and use it within that purpose." },
  { topic: IOT_MODULE_TOPICS[2], q: "What is the purpose of a data retention policy?", o: ["Define how long data is kept and when it is securely deleted", "Copy data to more servers indefinitely", "Make every reading public", "Remove access controls from old data"], a: 0, e: "Retention limits how long sensitive data remains exposed and should specify secure deletion." },
  { topic: IOT_MODULE_TOPICS[2], q: "What design feature supports user control over IoT data collection?", o: ["A clear way to pause collection and see the device state", "A hidden recording indicator", "A cloud-only shutdown option", "Recording that continues when display is off"], a: 0, e: "Meaningful control includes an understandable way to stop collection and feedback about the device state." },
  { topic: IOT_MODULE_TOPICS[3], q: "What is the role of system design before IoT implementation?", o: ["Map requirements to components, interfaces, and data flow", "Choose dashboard colors before defining the system", "Buy every available sensor", "Write a presentation instead of an architecture"], a: 0, e: "System design translates requirements into components and interfaces before implementation." },
  { topic: IOT_MODULE_TOPICS[3], q: "Which resilience technique helps preserve readings during a temporary cloud outage?", o: ["Buffer readings locally and retry delivery with limits", "Block sensor sampling until the cloud replies", "Discard all readings whenever Wi-Fi drops", "Restart continuously until the server responds"], a: 0, e: "Local buffering and controlled retries can tolerate outages without blocking the device primary function." },
  { topic: IOT_MODULE_TOPICS[3], q: "What testing approach provides evidence that an IoT prototype is reliable?", o: ["Repeat tests in expected conditions, including fault and outage cases", "Rely on one successful demonstration", "Remove logs so failures are less visible", "Test only the dashboard appearance"], a: 0, e: "Repeated realistic tests, including failure conditions, reveal reliability issues a single demo can miss." },
  { topic: IOT_MODULE_TOPICS[3], q: "What should integration testing verify across connected IoT components?", o: ["Interfaces, units, payload formats, and shared assumptions", "Only the presentation theme", "That each component uses different colors", "The number of devices in a team"], a: 0, e: "Integration testing checks whether connected components exchange and interpret data consistently." },
];


export const ROASTS = {
  iot: {
    good: [
      "AYAN! May laman pala ang utak. Hindi lang puro TikTok at scroll hanggang 3 AM.",
      "Connected ang device, connected din ang utak. Character development is real, beh.",
      "Secure ang credentials mo. Sana pati future mo secured na rin.",
      "May data visualization, may interpretation. Hindi lang pala puro react sa memes.",
      "Aba, nag-aral! Screenshot mo 'to. Baka hindi na maulit.",
      "Clean ang data flow. Hindi tulad ng love life mo na puro error 404.",
      "May requirements, may design, may testing. Hindi ka pala pabigat sa group project.",
      "SLAY! Alam ang sagot. Hindi lang pala pang-seen ang brain cells mo.",
      "Main character energy! Pati MQTT broker proud sa'yo.",
      "Correct! Hindi ka lang basta naka-connect sa Wi-Fi. Connected ka rin sa reality."
    ],

    bad: [
      "Beh, wrong answer. Nag-aral ka ba o nag-scroll lang sa TikTok buong gabi?",
      "Parang Wi-Fi sa public terminal. Connected nga, walang internet sa utak.",
      "API key mo nga may security, pero sagot mo public information. Kaloka.",
      "Hindi ito guessing game, beh. Hindi lahat ng choices mo magiging canon event.",
      "Maling sagot. Pati Google nagtanong kung okay ka lang.",
      "Nag-aaral ka ba o nakiki-charge lang sa classroom?",
      "Yung confidence mo pang 100%, pero yung knowledge mo naka-free trial.",
      "Girl/Bro, hindi lahat ng may cloud ay may forecast. Basahin mo muna ang tanong!",
      "Pati ESP32 napagod sa decision-making mo. Restart mo muna utak mo.",
      "Maling-mali. Kung sensor ka, defective ka na at for replacement.",
      "Nag-POST ka ng maling payload. Pati server nag-reply ng 'teka lang, beh.'",
      "Data minimization ang topic, pero pati common sense mo na-minimize.",
      "Default password pa rin? Beh, pati hacker nahihiya na sa'yo.",
      "Your answer has been rejected. Parang application mo sa pagiging academic weapon.",
      "Hysteresis ang tanong, pero hysterical ang sagot. HAHAHA.",
      "Hindi ito red flag detector, pero ikaw ang nakita ng system.",
      "Cloud of Things ang topic. Bakit utak mo nasa airplane mode?",
      "Puro ka wrong answer. Hindi ka na student, ikaw na ang system error.",
      "Outlier ang sagot mo. Hindi dahil special ka, kundi dahil mali ka.",
      "Kung effort mo ay isang sensor reading, NULL ang value.",
      "Hindi ka bobo, beh. Nagpapahinga lang yata nang matagal ang brain cells mo.",
      "Pati groupmate mong walang ambag mas maraming tamang sagot.",
      "Nag-review ka ba? O nagdasal ka lang na puro letter A?",
      "Your logic is giving 'trust me bro' with zero documentation.",
      "Hindi ka naman disconnected sa internet. Disconnected ka lang sa lesson."
    ],

    timeout: [
      "TIME'S UP! Mas mabilis pa mag-load ang Shopee checkout kaysa sa utak mo.",
      "Beh, ang tagal mong pumili. Hindi ka naman pumipili ng lifetime partner.",
      "Nag-timeout ang quiz. Pati patience ng instructor mo nag-expire na.",
      "Nawala na ang signal, wala pa ring sagot. Pati brain cells nag-log out.",
      "Bro is buffering in 144p.",
      "Time's up! Hindi ito TikTok, hindi lahat kailangan panoorin nang paulit-ulit.",
      "Mas mabilis pa ang jeep na pa-Tagaytay kaysa sa decision-making mo.",
      "Nag-iisip ka pa rin? Beh, tapos na ang season finale.",
      "Connection lost. Suspect: ikaw.",
      "Kahit loading screen may progress. Ikaw wala."
    ],

    streakBad: [
      "Sunod-sunod ang mali. Hindi na streak 'yan, character assassination na.",
      "BRO IS ON A LOSING STREAK. Pati algorithm naaawa na.",
      "Consistency is key! Consistently wrong ka nga lang.",
      "Puro mali. Parang nag-aaral ka gamit ang comment section ng Facebook.",
      "Your brain has officially entered its flop era.",
      "Hindi na ito bad luck. Personal choice mo na 'yan, beh.",
      "Pati random number generator mas may academic performance kaysa sa'yo.",
      "At this point, baka kailangan mo nang mag-reconnect sa elementary lessons.",
      "Wrong again. May talent ka talaga. Unfortunately, hindi ito 'yan.",
      "Achievement unlocked: Professional Guessing Champion."
    ],

    streakGood: [
      "SUNOD-SUNOD ANG TAMA! Sino ka at anong ginawa mo sa estudyanteng ito?",
      "Academic weapon detected. Hindi na ikaw ang pinag-uusapan sa faculty room.",
      "Beh, ang talino mo naman bigla. May update ba ang firmware mo?",
      "Perfect streak! Main character ka muna today.",
      "Pati ChatGPT napapa-'okay, slay' sa performance mo.",
      "Hindi ka na NPC. May character development na!",
      "Grabe, nag-review talaga. Hindi lang nag-open ng PDF tapos natulog.",
      "Brain cells are finally clocking in for work.",
      "The comeback is REAL. From loading screen to legendary.",
      "Certified academic weapon. Wag ka lang magpapalit ng personality bukas."
    ],
  },
};

export const ENDINGS = [
  [100, [
      "{score}%. PERFECT SCORE! Beh, ikaw na ang final boss ng IoT. Pati instructor mo napa-second look.",
      "{score}%. Hindi ka estudyante ngayon. Ikaw ang answer key na may tuition fee.",
      "{score}%. Academic weapon confirmed. Sana all may laman ang review session.",
      "{score}%. FULL MARKS! Paki-check kung ikaw ba talaga 'yan o may nag-control ng ESP32 mo.",
      "{score}%. Sobrang linis ng performance. Hindi ka na for improvement, ikaw na ang improvement.",
      "{score}%. YOU ATE AND LEFT NO CRUMBS. Pati MQTT broker napa-THANK YOU."
  ]],

  [80, [
      "{score}%. Slay naman. May ilang brain cells lang na nag-AWOL.",
      "{score}%. Solid score! Hindi ka pabigat sa group project. Congratulations!",
      "{score}%. May utak, may effort, may konting katangahan. Balanced diet.",
      "{score}%. Not bad, beh! Hindi ka na walking system error. May progress!",
      "{score}%. Malapit ka na sa academic weapon status. Konting review pa, wag puro ML.",
      "{score}%. Good job! Hindi ka perfect pero at least hindi ka walking red flag ng IoT."
  ]],

  [55, [
      "{score}%. Beh, pasado ka pero wag kang mag-celebrate na parang board passer.",
      "{score}%. At least may effort. Yung effort nga lang parang 5% battery.",
      "{score}%. Your academic comeback is still in development.",
      "{score}%. Pumasa ka by the skin of your teeth. Pati calculator napagod mag-compute.",
      "{score}%. May signal pero mahina. Try moving closer to your reviewer.",
      "{score}%. Congratulations! Barely survived. Parang naka-1 HP sa final boss."
  ]],

  [30, [
      "{score}%. Beh, hindi na quiz ang kailangan mo. Intervention na.",
      "{score}%. Olats! Pati grading system nagtanong kung sure ka ba.",
      "{score}%. Your score is giving expired Wi-Fi voucher.",
      "{score}%. Hindi ka bumagsak. Nag-dive ka straight to the bottom.",
      "{score}%. Pati random guessing hindi ka sinamahan. That's actually impressive.",
      "{score}%. Beh, yung score mo parang group project na isang tao lang ang gumawa. Kaso walang gumawa.",
      "{score}%. Critical alert! Academic performance has left the group chat.",
      "{score}%. Hindi pa huli ang lahat. Pero malapit na ang deadline, beh."
  ]],

  [0, [
      "{score}%. Beh. Ano 'to? Speedrun ng pagbagsak?",
      "{score}%. Pati pangalan mo yata hindi nag-register sa quiz.",
      "{score}%. Congratulations! Na-unlock mo ang rarest achievement: zero out of everything.",
      "{score}%. Walang tama. Kahit isang awa point, hindi ka pinagbigyan ng universe.",
      "{score}%. Your academic status: Under Maintenance. Estimated completion: Unknown.",
      "{score}%. Beh, hindi ka nag-quiz. Nag-donate ka ng answers sa wrong answer foundation.",
      "{score}%. Pati ESP32 walang signal. Pati brain cells nag-resign.",
      "{score}%. This is not a canon event anymore. This is a whole documentary.",
      "{score}%. System Error 404: Knowledge Not Found.",
      "{score}%. Hindi ka natalo ng quiz. Tinalo ka ng sarili mong choices."
  ]]
];
