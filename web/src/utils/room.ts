const ROOM_ID_CHARSET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'

export function generateRoomId(length = 6): string {
  if (typeof window === 'undefined') {
    return ''.padEnd(length, 'X')
  }

  const cryptoSource = window.crypto ?? (window as typeof window & { msCrypto?: Crypto }).msCrypto
  const values = new Uint32Array(length)

  if (cryptoSource) {
    cryptoSource.getRandomValues(values)
    return Array.from(values, (value) => ROOM_ID_CHARSET[value % ROOM_ID_CHARSET.length]!).join('')
  }

  return Array.from({ length }, () => {
    const index = Math.floor(Math.random() * ROOM_ID_CHARSET.length)
    return ROOM_ID_CHARSET[index]!
  }).join('')
}
