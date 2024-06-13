export interface Policy {
  "id": string;
  "type": string;
  "edc:createdAt": number;
  "edc:policy": {
    "@id": string;
    "@type": string;
    "odrl:permission": {
      "odrl:action": {
        "odrl:type": string;
      };
      "odrl:constraint": {
        "odrl:leftOperand": string;
        "odrl:operator": {
          "@id": string;
        };
        "odrl:rightOperand": string;
      };
    };
    "odrl:prohibition": any[];
    "odrl:obligation": any[];
  };
  "@context": {
    "dct": string;
    "edc": string;
    "dcat": string;
    "odrl": string;
    "dspace": string;
  };
}
