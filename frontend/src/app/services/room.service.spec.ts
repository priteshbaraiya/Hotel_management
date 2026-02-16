import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RoomService } from './room.service';
import { Room } from '../models/room.model';

describe('RoomService', () => {
  let service: RoomService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RoomService]
    });
    service = TestBed.inject(RoomService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve rooms from the API via GET', () => {
    const dummyRooms: Room[] = [
      { _id: '1', title: 'Room 1', description: 'desc 1', price: 100, amenities: [], imagePath: 'path1' },
      { _id: '2', title: 'Room 2', description: 'desc 2', price: 200, amenities: [], imagePath: 'path2' }
    ];

    service.getRooms().subscribe(rooms => {
      expect(rooms.length).toBe(2);
      expect(rooms).toEqual(dummyRooms);
    });

    const request = httpMock.expectOne(`${service['apiUrl']}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyRooms);
  });

  it('should retrieve a single room from the API via GET', () => {
    const dummyRoom: Room = { _id: '1', title: 'Room 1', description: 'desc 1', price: 100, amenities: [], imagePath: 'path1' };

    service.getRoom('1').subscribe(room => {
      expect(room).toEqual(dummyRoom);
    });

    const request = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyRoom);
  });
});
