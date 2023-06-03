/**
 * Validates the status field of a campaign assignment against a predefined list of valid values.
 * @param status - The status field value to validate.
 * @returns {boolean} - Returns true if the status is valid, false otherwise.
 */
export function validateCampaignAssignmentStatus(status) {
    const validStatusValues = ['ongoing', 'pending', 'completed'];
    return validStatusValues.includes(status);
}
//# sourceMappingURL=validate_campaign_assignment_status.js.map