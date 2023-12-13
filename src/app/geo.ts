import { Geolocation, PermissionStatus, Position } from '@capacitor/geolocation';

function hasLocationPermission({ location }: PermissionStatus): boolean {
  switch (location) {
    case 'granted':
      return true;
  }
  return false;
}

async function getLocationPermission(): Promise<boolean> {
  if (hasLocationPermission(await Geolocation.checkPermissions())) {
    return true;
  }

  return hasLocationPermission(await Geolocation.requestPermissions({ permissions: ['location'] }));
}

export const Gps = <const>{
  getCurrentPositionWithPermission: async (): Promise<Position> => {
    if (await getLocationPermission()) {
      return await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
    }

    throw new Error('Permission to access geolocation was denied or the device returned nothing.');
  },
};
