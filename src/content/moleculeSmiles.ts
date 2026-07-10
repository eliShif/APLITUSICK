// מיפוי SMILES פשוט (בלי סטראוכימיה מפורטת - לצורך ציור שלד קווי 2D בלבד, הגיאומטריה
// המדויקת מוצגת במודל התלת-ממדי) לפי אותו CID שמוגדר ב-moleculeCids.ts.
// מולקולות מורכבות מדי לציור ברור (למשל דו-סוכרים) או יוניות (NaOH) הושמטו בכוונה -
// הרכיב שמשתמש במפה הזו נופל בחן להצגת נוסחה/3D בלבד כשאין ערך.
export const SMILES_BY_CID: Record<number, string> = {
  297: "C", // methane
  6324: "CC", // ethane
  6334: "CCC", // propane
  7843: "CCCC", // butane
  6360: "CC(C)C", // isobutane
  6556: "CCC(C)C", // 2-methylbutane
  8078: "C1CCCCC1", // cyclohexane
  9253: "C1CCCC1", // cyclopentane

  6323: "CBr", // bromomethane
  6332: "CCBr", // bromoethane
  7840: "CCCBr", // 1-bromopropane
  6358: "CC(Br)C", // 2-bromopropane
  10485: "CC(C)(C)Br", // tert-butyl bromide
  6327: "CCl", // chloromethane
  8005: "CCCCCl", // 1-chlorobutane
  6328: "CI", // iodomethane
  6212: "ClC(Cl)Cl", // chloroform
  7839: "BrCCBr", // 1,2-dibromoethane
  6338: "C=CCl", // vinyl chloride

  702: "CCO", // ethanol
  887: "CO", // methanol
  3776: "CC(O)C", // 2-propanol
  1031: "CCCO", // 1-propanol
  6386: "CC(C)(C)O", // tert-butyl alcohol
  6343: "CCS", // ethanethiol
  7966: "OC1CCCCC1", // cyclohexanol

  6325: "C=C", // ethylene
  8252: "C=CC", // propene
  7844: "C=CCC", // 1-butene
  5287573: "C/C=C\\C", // cis-2-butene
  62695: "C/C=C/C", // trans-2-butene
  8255: "CC(=C)C", // isobutylene
  8079: "C1=CCCCC1", // cyclohexene
  7845: "C=CC=C", // 1,3-butadiene

  241: "c1ccccc1", // benzene
  1140: "Cc1ccccc1", // toluene
  996: "Oc1ccccc1", // phenol
  6115: "Nc1ccccc1", // aniline
  7501: "C=Cc1ccccc1", // styrene
  931: "c1ccc2ccccc2c1", // naphthalene

  176: "CC(=O)O", // acetic acid
  284: "OC=O", // formic acid
  8857: "CCOC(=O)C", // ethyl acetate
  7918: "CC(=O)OC(=O)C", // acetic anhydride
  6367: "CC(=O)Cl", // acetyl chloride
  178: "CC(=O)N", // acetamide
  6342: "CC#N", // acetonitrile
  1032: "CCC(=O)O", // propanoic acid
  243: "OC(=O)c1ccccc1", // benzoic acid
  338: "OC(=O)c1ccccc1O", // salicylic acid
  971: "OC(=O)C(=O)O", // oxalic acid
  999: "OC(=O)Cc1ccccc1", // phenylacetic acid
  7413: "OC(=O)C1CCCCC1", // cyclohexanecarboxylic acid

  177: "CC=O", // acetaldehyde
  712: "C=O", // formaldehyde
  527: "CCC=O", // propanal
  261: "CCCC=O", // butanal
  180: "CC(=O)C", // acetone
  6569: "CCC(=O)C", // 2-butanone
  7288: "CCC(=O)CC", // 3-pentanone
  7967: "O=C1CCCCC1", // cyclohexanone
  240: "O=Cc1ccccc1", // benzaldehyde

  8868: "CCOC(=O)CC(=O)C", // ethyl acetoacetate
  7761: "CCOC(=O)CC(=O)OCC", // diethyl malonate
  612: "CC(O)C(=O)O", // lactic acid
  1060: "CC(=O)C(=O)O", // pyruvic acid

  5793: "OCC(O)C(O)C(O)C(O)C=O", // glucose (open chain, simplified)
  2723872: "OCC(=O)C(O)C(O)C(O)CO", // fructose (open chain, simplified)
  6036: "OCC(O)C(O)C(O)C(O)C=O", // galactose (open chain, simplified)
  10975657: "OCC(O)C(O)C(O)C=O", // ribose (open chain, simplified)

  3283: "CCOCC", // diethyl ether
  8254: "COC", // dimethyl ether
  260: "Br", // hydrogen bromide
  962: "O", // water
  222: "N", // ammonia
};
