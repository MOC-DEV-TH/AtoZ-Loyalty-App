class Promotion {
    constructor(
      id,
      promo_id,
      name,
      ads_type,
      image_en,
      image_mm,
      image_cn,
      created_date,
      created_by,
      modified_date,
      modified_by,
      description,
      descriptionmm,
      namemm
    ) {
      this.id = id;
      this.promo_id = promo_id;
      this.name = name;
      this.ads_type = ads_type;
      this.image_en = image_en;
      this.image_mm = image_mm;
      this.image_cn = image_cn;
      this.created_date = created_date;
      this.created_by = created_by;
      this.modified_date = modified_date;
      this.modified_by = modified_by;
      this.description = description;
      this.descriptionmm = descriptionmm;
      this.namemm = namemm
    }
  }
  
  export default Promotion;
  