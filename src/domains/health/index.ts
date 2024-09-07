import { Express } from 'express';
import { loadIndex } from './routes'; 

export function loadIn(server: Express): void {
  loadIndex(server);
}