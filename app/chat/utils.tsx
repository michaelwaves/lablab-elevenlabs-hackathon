import { Timestamp } from "firebase/firestore";

export function formatDate(date: Date) {
    // Get the current date
    const currentDate = new Date();

    // Check if the input date falls on the same day
    if (
        date.getDate() === currentDate.getDate() &&
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear()
    ) {
        // Format the time portion
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');

        const timeString = `${hours % 12 || 12}:${minutes}${hours < 12 ? 'am' : 'pm'}`;

        // Omit the day/month/year and return the formatted time
        return `${timeString}`;
    }

    // Check if the input date falls on the previous day
    const previousDate = new Date();
    previousDate.setDate(previousDate.getDate() - 1);

    if (
        date.getDate() === previousDate.getDate() &&
        date.getMonth() === previousDate.getMonth() &&
        date.getFullYear() === previousDate.getFullYear()
    ) {
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');

        const timeString = `${hours % 12 || 12}:${minutes}${hours < 12 ? 'am' : 'pm'}`;

        // Format the 'yesterday' portion
        const dayString = 'yesterday';

        // Return the formatted 'yesterday' string
        return `${dayString} at ${timeString}`;
    }

    // Format the date, month, and year portion
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const dateString = `${day}/${month}/${year}`;

    // Format the time portion
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const timeString = `${hours % 12 || 12}:${minutes}${hours < 12 ? 'am' : 'pm'}`;

    // Return the formatted string with the date and time
    return `${dateString} ${timeString}`;
}