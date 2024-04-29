export default function formatDate(dateString) {
  const parts = dateString.split("-");
  // Rearrange parts to format as dd-mm-yyyy
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}
