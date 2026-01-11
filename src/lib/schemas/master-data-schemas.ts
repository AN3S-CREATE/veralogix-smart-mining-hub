
import { z } from 'zod';

export const AssetSchema = z.object({
  id: z.string().optional(),
  tenantId: z.string(),
  siteId: z.string(),
  name: z.string(),
  type: z.enum(['Vehicle', 'Machine', 'Plant Equipment']),
  make: z.string().optional(),
  model: z.string().optional(),
  serialNumber: z.string().optional(),
  status: z.enum(['Active', 'Maintenance', 'Inactive', 'Decommissioned']),
  maintenance: z.object({
    lastServiceDate: z.string().optional(),
    nextServiceDue: z.string().optional(),
    engineHours: z.number().optional(),
  }).optional(),
  specs: z.object({
    fuelCapacity: z.number().optional(),
    loadCapacity: z.number().optional(),
  }).optional(),
  assignedSensors: z.array(z.string()).optional(), // Sensor IDs
});

export const DeviceSchema = z.object({
  id: z.string().optional(),
  tenantId: z.string(),
  siteId: z.string(),
  type: z.enum(['IoT Sensor', 'GPS Tracker', 'Environmental Monitor', 'Tag']),
  status: z.enum(['Active', 'Offline', 'Error']),
  assignedTo: z.object({
    type: z.enum(['Asset', 'Person', 'Zone']),
    id: z.string(),
  }).optional(),
  lastPing: z.string().optional(),
  batteryLevel: z.number().optional(),
});

export const EnvironmentalReadingSchema = z.object({
  id: z.string().optional(),
  tenantId: z.string(),
  siteId: z.string(),
  timestamp: z.string(),
  type: z.enum(['Dust', 'AirQuality', 'Weather']),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
    zoneId: z.string().optional(),
  }).optional(),
  metrics: z.object({
    pm25: z.number().optional(),
    pm10: z.number().optional(),
    co2: z.number().optional(),
    temperature: z.number().optional(),
    humidity: z.number().optional(),
    windSpeed: z.number().optional(),
    windDirection: z.number().optional(), // Degrees
  }),
});
