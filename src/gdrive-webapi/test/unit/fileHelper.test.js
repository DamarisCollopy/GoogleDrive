import {describe,test,expect,jest} from '@jest/globals'
import fs from 'fs'
import FileHelper from '../../settings/fileHelper.js'

//import Routes from '../../routes/routes.js'

describe('#FileHelper', () => {

    describe('#getFileStatus', () => {
        test('it should return files statuses in correct format', async () => {
            const statMock = {
                dev: 701508368,
                mode: 33206,
                nlink: 1,
                uid: 0,
                gid: 0,
                rdev: 0,
                blksize: 4096,
                ino: 1125899907035456,
                size: 468685,
                blocks: 920,
                atimeMs: 1631454143571.909,
                mtimeMs: 1631454143444.9998,
                ctimeMs: 1631454143445.91,
                birthtimeMs: 1631454113356.1995,
                atime: '2021-09-12T13:42:23.572Z',
                mtime: '2021-09-12T13:42:23.445Z',
                ctime: '2021-09-12T13:42:23.446Z',
                birthtime: '2021-09-12T13:41:53.356Z'
            }

            const mockUser = 'undefined'
            process.env.USER = mockUser
            const filename = 'file.png'

            jest.spyOn(fs.promises, fs.promises.readdir.name)
                .mockResolvedValue([filename])
            
            jest.spyOn(fs.promises, fs.promises.stat.name)
                .mockResolvedValue(statMock)
            
            const result = await FileHelper.getFilesStatus("/tmp")

            const expectedResult = [
                {
                    size: "469 kB",
                    lastModified: statMock.birthtime,
                    owner: mockUser,
                    file: filename
                }
            ]

            expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`)
            expect(result).toMatchObject(expectedResult)
        })
    })
})