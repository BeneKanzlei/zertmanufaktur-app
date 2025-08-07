import { useState } from 'react'

interface NotificationData {
  login?: {
    userName: string
    ipAddress: string
    location: string
    timestamp: string
  }
  comment?: {
    userName: string
    commentText: string
    postTitle: string
  }
  task?: {
    userName: string
    taskTitle: string
    taskDescription: string
  }
  appointment?: {
    userName: string
    appointmentTitle: string
    appointmentDate: string
    appointmentTime: string
  }
  welcome?: {
    userName: string
  }
}

export function useNotifications() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendNotification = async (
    userEmail: string,
    notificationType: 'login' | 'comment' | 'task' | 'appointment' | 'welcome',
    data: NotificationData[keyof NotificationData]
  ) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail,
          notificationType,
          data,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Fehler beim Senden der Benachrichtigung')
      }

      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unbekannter Fehler'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Spezifische Funktionen für verschiedene Benachrichtigungstypen
  const sendLoginNotification = async (
    userEmail: string,
    userName: string,
    ipAddress: string,
    location: string,
    timestamp: string
  ) => {
    return sendNotification(userEmail, 'login', {
      userName,
      ipAddress,
      location,
      timestamp
    })
  }

  const sendCommentNotification = async (
    userEmail: string,
    userName: string,
    commentText: string,
    postTitle: string
  ) => {
    return sendNotification(userEmail, 'comment', {
      userName,
      commentText,
      postTitle,
    })
  }

  const sendTaskNotification = async (
    userEmail: string,
    userName: string,
    taskTitle: string,
    taskDescription: string
  ) => {
    return sendNotification(userEmail, 'task', {
      userName,
      taskTitle,
      taskDescription,
    })
  }

  const sendAppointmentNotification = async (
    userEmail: string,
    userName: string,
    appointmentTitle: string,
    appointmentDate: string,
    appointmentTime: string
  ) => {
    return sendNotification(userEmail, 'appointment', {
      userName,
      appointmentTitle,
      appointmentDate,
      appointmentTime,
    })
  }

  const sendWelcomeNotification = async (
    userEmail: string,
    userName: string
  ) => {
    return sendNotification(userEmail, 'welcome', {
      userName,
    })
  }

  return {
    sendNotification,
    sendLoginNotification,
    sendCommentNotification,
    sendTaskNotification,
    sendAppointmentNotification,
    sendWelcomeNotification,
    isLoading,
    error,
  }
} 