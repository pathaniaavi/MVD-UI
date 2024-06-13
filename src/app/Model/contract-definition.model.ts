export interface ContractDefinition {
  "@id": string;
  "@type": string;
  "edc:accessPolicyId": string;
  "edc:contractPolicyId": string;
  "edc:assetsSelector": AssetSelector | AssetSelector[];
  "@context": Context;
}

export interface AssetSelector {
  "@type": string;
  "edc:operandLeft": string;
  "edc:operator": string;
  "edc:operandRight": string;
}

export interface Context {
  "dct": string;
  "edc": string;
  "dcat": string;
  "odrl": string;
  "dspace": string;
}
