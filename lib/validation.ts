import { FormData } from './types';

export function isStepValid(step: number, formData: FormData): boolean {
  switch (step) {
    case 0:
      return true;
    case 1:
      return !!(
        formData.brandName.trim() &&
        formData.mainMenu.trim() &&
        formData.foundedYear.trim()
      );
    case 2:
      return !!(formData.strengths.trim() && formData.differentiation.trim());
    case 3: {
      const base =
        formData.avgMonthlySales.trim() &&
        formData.avgNetProfit.trim() &&
        formData.foodCostRatio.trim() &&
        formData.directStoreCount.trim() &&
        formData.franchiseStoreCount.trim();
      if (!base) return false;
      const directCount = parseInt(formData.directStoreCount) || 0;
      const franchiseCount = parseInt(formData.franchiseStoreCount) || 0;
      const directOk = directCount === 0 || !!formData.directStoreNames.trim();
      const franchiseOk = franchiseCount === 0 || !!formData.franchiseStoreNames.trim();
      return directOk && franchiseOk;
    }
    case 4:
      return !!(
        formData.franchiseFee.trim() &&
        formData.interiorCost.trim() &&
        formData.initialLogisticsCost.trim() &&
        formData.totalEstimatedCost.trim()
      );
    case 5: {
      const base =
        !!formData.hasRoyalty &&
        formData.trainingFee.trim() &&
        formData.marketingSupport.trim() &&
        formData.supplyMethod.trim();
      if (!base) return false;
      if (formData.hasRoyalty === 'yes') return !!formData.royaltyDetails.trim();
      return true;
    }
    case 6:
      return !!(formData.consultationPhone.trim() && formData.consultationHours.trim());
    case 7:
      return true;
    case 8:
      return !!(
        formData.companyName.trim() &&
        formData.ceoName.trim() &&
        formData.businessNumber.trim() &&
        formData.address.trim() &&
        formData.mainPhone.trim() &&
        formData.businessEmail.trim()
      );
    case 9:
      return true;
    default:
      return true;
  }
}
