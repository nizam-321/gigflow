export const isValidBudget = (budget: number) => {
    if (isNaN(budget)) return false;
    if(budget < 1) return false;
    if (budget > 1_000_000) return false;
    return true;
}