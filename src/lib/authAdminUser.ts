export async function authAdminHandler (authData: {email: string, password: string}): Promise<{success: boolean, message: string, data: any}> {
    try {

      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(authData)
      })

      if (!response.ok) {
        throw new Error(`Ошибка сетевого запроса ${response.status} - ${response.statusText}`)
      }

      const data = await response.json()
      return data

      
      
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        console.log(`Ошибка ${error.message}`)
        return {
          success: false,
          message: `Ошибка ${error.message}`,
          data: null
        }
      }

      console.error(`Неизвестная ошибка ${error}`)
      return {
        success: false,
        message: `Неизвестная ошибка ${error}`,
        data: null
      }

    }
  }