export function formatUUID(uuid: string) {
    return uuid.substring(0, 8) + "-"
        + uuid.substring(8, 12) + "-" 
        + uuid.substring(12, 16) + "-"
        + uuid.substring(16, 20) + "-" 
        + uuid.substring(20);
}