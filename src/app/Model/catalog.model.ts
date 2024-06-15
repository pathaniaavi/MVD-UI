// catalog.model.ts
export interface Catalog {
  "@id": string;
  "@type": string;
  "dcat:dataset": Dataset[];
  "dcat:service": DataService;
  "edc:participantId": string;
  "@context": Context;
}

export interface Dataset {
  "@id": string;
  "@type": string;
  "odrl:hasPolicy": HasPolicy;
  "dcat:distribution": Distribution;
  "edc:version": string;
  "edc:type": string;
  "edc:name": string;
  "edc:id": string;
  "edc:contenttype": string;
}

export interface HasPolicy {
  "@id": string;
  "@type": string;
  "odrl:permission": Permission | Permission[];
  "odrl:prohibition": any[];
  "odrl:obligation": any[];
  "odrl:target": string;
}

export interface Permission {
  "odrl:target": string;
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
}

export interface Distribution {
  "@type": string;
  "dct:format": {
    "@id": string;
  };
  "dcat:accessService": string;
}

export interface DataService {
  "@id": string;
  "@type": string;
  "dct:terms": string;
  "dct:endpointUrl": string;
}

export interface Context {
  "dct": string;
  "edc": string;
  "dcat": string;
  "odrl": string;
  "dspace": string;
}
