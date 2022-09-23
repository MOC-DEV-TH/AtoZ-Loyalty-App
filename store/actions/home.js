import AppVersion from "../../constants/AppVersion";
import Global from "../../constants/Global";
import HomePromotion from "../../model/home_promotion";
export const SET_HOME_PROMOTION = "SET_HOME_PROMOTION";

export const getPromotions = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    console.log("token", token);
    const response = await fetch(
      Global.baseUrl + "get_home?app_version=" + AppVersion.app_version,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          token: token,
        },
      }
    );

    if (!response.ok) {
      const errorResData = await response.text();
      console.log(errorResData);
      let message = "Something went wrong!";
      throw new Error(message);
    }

    const respData = await response.json();
    console.log(respData);

    const loadPromotions = [];

    for (const item of respData.details) {
      loadPromotions.push(
        new HomePromotion(
          item.id,
          item.promo_id,
          item.name,
          item.ads_type,
          item.image_en,
          item.image_mm,
          item.image_cn,
          item.created_date,
          item.created_by,
          item.modified_date,
          item.modified_by
        )
      );
    }

    console.log("Get Home Promotions data ");
    console.log(loadPromotions);

    dispatch({
      type: SET_HOME_PROMOTION,
      promotions: loadPromotions,
    });
  };
};
