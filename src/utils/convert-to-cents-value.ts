import React from "react";

export const formatCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
  let { value } = e.target;

  if(value) {
    value = value.replace(/\D/g, "");
    value = (Number(value) / 100).toFixed(2);
    value = value.replace(".", ",");
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  e.target.value = value;
};
