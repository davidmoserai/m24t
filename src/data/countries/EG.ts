import type { CountryData } from "../../types.js"

// INFORMATIONAL ONLY — NOT LEGAL ADVICE. See LICENSE and DISCLAIMER.md.
//
// Egypt — Personal Data Protection Law No. 151 of 2020 (PDPL),
// as published in the Official Gazette (الجريدة الرسمية) العدد 28
// مكرر (هـ) في 15 يولية سنة 2020. Regulator: Personal Data
// Protection Center — مركز حماية البيانات الشخصية (established
// by Art. 19, Chapter 9), attached to MCIT.
//
// Executive Regulations: reported issued by Ministerial Decree
// 816 of 2025 (وزير الاتصالات وتكنولوجيا المعلومات) on 1 Nov
// 2025; primary-source verification against mcit.gov.eg / the
// Official Gazette was not obtainable at last review, so the
// specific text of the executive regulations is treated as
// UNVERIFIED here — only the statute (Law 151/2020) is relied on
// below.
//
// Key statutory provisions for direct electronic marketing
// (all article numbers verified against the Official Gazette
// scan of Law 151/2020):
//   Art. 6  — Lawful bases for electronic processing (consent
//             for a specified purpose is the first-listed basis).
//   Art. 12 — Sensitive personal data: collection/processing
//             requires a licence from the PDPC and, save for
//             legally authorised cases, WRITTEN AND EXPLICIT
//             consent ("موافقة كتابية وصريحة"). Same article
//             requires PARENTAL consent for any operation
//             involving children's data ("وفى حالة إجراء أى
//             عملية... تتعلق ببيانات الأطفال، يلزم موافقة
//             ولى الأمر").
//   Art. 14 — Cross-border transfers of personal data prohibited
//             unless recipient jurisdiction offers protection no
//             lower than the PDPL, AND a licence/permit is
//             issued by the PDPC ("وبترخيص أو تصريح من المركز").
//   Art. 17 — DIRECT ELECTRONIC MARKETING (Chapter 8 - التسويق
//             الإلكتروني المباشر): "يحظر إجراء أى اتصال
//             إلكترونى بغرض التسويق المباشر للشخص المعنى
//             بالبيانات، إلا بتوافر الشروط الآتية" — (1) consent
//             of the data subject, (2) sender identity in every
//             message, (3) valid postal/contact address of
//             sender, (4) clear indication the message is for
//             direct-marketing purposes, (5) clear/simple
//             mechanism to refuse or withdraw consent.
//   Art. 18 — Marketing-sender obligations: specified marketing
//             purpose, non-disclosure of contact data, AND
//             "الاحتفاظ بسجلات إلكترونية مثبت بها موافقة
//             الشخص المعنى بالبيانات ... وذلك لمدة ثلاث سنوات
//             من تاريخ آخر إرسال" — RETAIN CONSENT RECORDS
//             FOR 3 YEARS (36 MONTHS) FROM LAST SEND.
//
// PDPL scope is natural persons — there is no statutory B2B
// carve-out for employee/role addresses tied to identifiable
// individuals. The statute does not provide a soft-opt-in
// (existing-customer / similar-products) regime.
// Arabic is the official language of Egypt; consent wording
// directed at Egyptian residents must be intelligible in Arabic.
//
// Source: Law 151/2020, Official Gazette العدد 28 مكرر (هـ),
//         15 July 2020, published by MCIT (mcit.gov.eg PDF).
export const EG: CountryData = {
  code: "EG",
  regime: "PDPL",
  defaults: {
    canCollectForMarketing: true,
    // Art. 17 — consent required for any electronic direct
    // marketing communication; Art. 12 requires written+explicit
    // consent for sensitive data. Prechecking is not permissible.
    optIn: "express",
    checkboxRequired: true,
    bundlingAllowed: false,
    prechecking: "forbidden",
    channels: ["email"],
    unsubscribeMechanism: "one-click",
    // No statutory soft opt-in under PDPL.
    softOptInAvailable: false,
    softOptInScope: "none",
    requiresCallerSimilarityAssertion: false,
    impliedConsentTtlMonths: null,
    b2bExemption: {
      regime: "none",
      conditions: [
        "PDPL Art. 2 covers personal data of natural persons; role-based business addresses tied to identifiable individuals are in scope",
      ],
    },
    // Arabic required for consent wording directed at EG residents.
    consentLanguage: { required: ["ar"], mustMatchUserLocale: true },
    // Art. 14 — cross-border transfer requires PDPC licence AND
    // recipient country adequate; Art. 15 allows explicit-consent
    // exception in listed cases (medical, legal, etc.).
    dataResidency: { storageRegion: "any", crossBorderTransferMechanism: "explicit-consent" },
    // Art. 18(3) — "لمدة ثلاث سنوات من تاريخ آخر إرسال"
    // (retain consent records for 3 years from last send) = 36 months.
    consentRecordRetentionMonths: 36,
    sensitiveDataFlags: {
      healthMarketingBlocked: true,
      politicalMarketingBlocked: true,
      childrenBlocked: true,
    },
    preferenceCenter: { granularityRequired: "purpose", perEmailUnsubAlsoRequired: true },
    // Art. 17(2)-(3) — every marketing message must carry the
    // originator/sender identity AND a valid contact address.
    senderIdentity: {
      physicalAddressRequired: true,
      legalEntityNameRequired: true,
      representativeRequired: true,
    },
    reConsentTriggerMonths: 24,
    // Art. 12 — operations involving children's data require
    // parental consent ("موافقة ولى الأمر"). PDPL does not fix
    // an explicit age of majority for consent; general Egyptian
    // civil-law majority (18) is used here.
    childAgeOfConsent: 18,
    parentalVerificationRequired: true,
    proofRequired: ["timestamp", "ip", "source", "wording", "ua"],
    basis: {
      statute: "Egypt Personal Data Protection Law No. 151 of 2020 (PDPL), Arts. 6, 12, 14, 17, 18 (Official Gazette العدد 28 مكرر (هـ), 15 July 2020)",
      url: "https://mcit.gov.eg/Upcont/Documents/Reports%20and%20Documents_1232021000_Law_No_151_2020_Personal_Data_Protection.pdf",
      jurisdiction: "EG",
      subRegime: "EG-PDPL",
      dataLastUpdated: "2026-09-01",
      confidence: "medium",
      extraterritorialReach: true,
      lawyerAttestation: null,
    },
    suggestedTemplate: "double-opt-in",
  },
  byContext: {
    "lead-magnet": { canCollectForMarketing: false, optIn: "blocked", suggestedTemplate: "blocked" },
    transactional: { proofRequired: [] },
  },
  byRelationship: {
    // PDPL provides no soft opt-in for existing customers.
  },
}
