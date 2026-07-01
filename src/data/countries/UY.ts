import type { CountryData } from "../../types.js"

// INFORMATIONAL ONLY — NOT LEGAL ADVICE. See LICENSE and DISCLAIMER.md.
//
// Uruguay: Ley N° 18.331 (Protección de Datos Personales, 2008) +
// Decreto 414/009 (reglamentación) + Ley N° 19.670 Art. 37
// (extraterritorial scope, 2018). Regulator: URCDP (Unidad Reguladora
// y de Control de Datos Personales). EU adequacy decision since 2012.
//
// Art. 9 of Ley 18.331 requires "libre, previo, expreso e informado"
// consent for processing — for direct marketing this means a single
// express opt-in (not double). Art. 21 grants data subjects the right
// to request retiro/bloqueo of their data from advertising / commercial
// prospecting databases at any time; there is no formal "soft opt-in"
// carve-out for existing customers under Uruguayan law. NOTE: Art. 2
// of Ley 18.331 extends protection to legal persons ("personas
// jurídicas") "en cuanto corresponda", so there is no clean natural-
// person-only carve-out for B2B — B2B contact data is covered when
// applicable, hence b2bExemption.regime = "none" without any relief.
export const UY: CountryData = {
  code: "UY",
  regime: "Ley 18.331",
  defaults: {
    canCollectForMarketing: true,
    optIn: "express",
    checkboxRequired: true,
    bundlingAllowed: false,
    prechecking: "forbidden",
    channels: ["email"],
    unsubscribeMechanism: "one-click",
    softOptInAvailable: false,
    softOptInScope: "none",
    requiresCallerSimilarityAssertion: false,
    impliedConsentTtlMonths: null,
    b2bExemption: {
      // Ley 18.331 Art. 2 extends protection to legal persons "en cuanto
      // corresponda" — so there is NO natural-person-only carve-out and
      // no B2B relief. All identifiable contact data (natural or legal
      // person contacts) falls within scope; express consent still required.
      regime: "none",
      conditions: [
        "Ley 18.331 Art. 2 — protección se extiende a personas jurídicas en cuanto corresponda; no hay excepción B2B",
        "Any identifiable contact (named employee email, or business address tied to an identifiable entity) remains in scope",
      ],
    },
    consentLanguage: { required: ["es"], mustMatchUserLocale: true },
    dataResidency: { storageRegion: "any", crossBorderTransferMechanism: "adequacy" },
    consentRecordRetentionMonths: 60,
    sensitiveDataFlags: {
      healthMarketingBlocked: true,
      politicalMarketingBlocked: true,
      childrenBlocked: true,
    },
    preferenceCenter: { granularityRequired: "purpose", perEmailUnsubAlsoRequired: true },
    senderIdentity: {
      physicalAddressRequired: true,
      legalEntityNameRequired: true,
      representativeRequired: false,
    },
    reConsentTriggerMonths: 24,
    // Ley 18.331 has no explicit data-protection consent age. Código de
    // la Niñez y la Adolescencia (Ley N° 17.823) art. 1 defines "niño"
    // as ≤13 and "adolescente" as 13–<18; Decreto 64/020 art. 6 flags
    // menores de edad as a "grupo en situación de especial vulnerabilidad"
    // for impact assessments but sets no autonomous-consent age. 13 is
    // used here as the niño/adolescente boundary heuristic; below 13
    // parental verification applies.
    childAgeOfConsent: 13,
    parentalVerificationRequired: true,
    proofRequired: ["timestamp", "ip", "source", "wording", "ua"],
    basis: {
      statute: "Ley N° 18.331 (Protección de Datos Personales, 2008) + Decreto 414/009 + Ley N° 19.670 Art. 37 (extraterritorial scope)",
      url: "https://www.gub.uy/unidad-reguladora-control-datos-personales",
      jurisdiction: "UY",
      subRegime: "UY-18331",
      dataLastUpdated: "2026-07-01",
      confidence: "medium",
      // Ley 19.670 Art. 37 extends Ley 18.331 to controllers/processors
      // outside Uruguay when processing targets data subjects in Uruguay
      // or uses means located in Uruguay.
      extraterritorialReach: true,
      lawyerAttestation: null,
    },
    suggestedTemplate: "single-opt-in",
  },
  byContext: {
    "lead-magnet": { canCollectForMarketing: false, optIn: "blocked", suggestedTemplate: "blocked" },
    transactional: { proofRequired: [] },
  },
  byRelationship: {
    // Ley 18.331 Art. 21 — data subject may opt out at any time.
    // No formal soft opt-in carve-out exists, so existing-customer
    // status does not relax the express-consent requirement.
    "existing-customer": {
      softOptInAvailable: false,
      softOptInScope: "none",
      requiresCallerSimilarityAssertion: false,
    },
  },
}
