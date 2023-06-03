/**
 * Validates the status field of a campaign assignment against a predefined list of valid values.
 * @param status - The status field value to validate.
 * @returns {boolean} - Returns true if the status is valid, false otherwise.
 */
export function validateCampaignAssignmentStatus(status: string): boolean {
    const validStatusValues = ['ongoing', 'pending', 'completed'];
    return validStatusValues.includes(status);
}
