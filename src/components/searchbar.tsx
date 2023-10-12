"use client"
import { ApiCourseType } from '@/utils/types';
import { useEffect, useState } from 'react';

const SearchBar = ({ addUserCourse }: { addUserCourse: (arg0: ApiCourseType) => void }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [courses, setCourses] = useState<ApiCourseType[]>([]);

    useEffect(() => {
        async function search() {
            const fetchedCourses = await fetch(`/api/search?searchTerm=${searchTerm}`).then(res => res.json())
            setCourses(fetchedCourses)
        }
        search()
    }, [searchTerm])

    return (
        <>
            <div className={`fixed inset-0 bg-black ${isActive ? 'bg-opacity-50' : 'bg-opacity-0'} ${isActive ? 'backdrop-blur-[4px]' : 'backdrop-blur-none'} ${isActive ? "z-10" : "z-0"} transition-opacity`} onClick={() => setIsActive(false)}></div>
            <div className="relative mt-10 mx-auto w-1/2 z-20">
                <div className="relative flex justify-center p-4 bg-custom-radial border border-opacity-30 border-white rounded shadow-md">
                    <svg
                        className="h-6 w-6 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M21 21l-6-6m2-6a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <input
                        className="w-full pl-4 bg-transparent border-0 focus:ring-0 focus:outline-none text-white placeholder-white"
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onClick={() => setIsActive(true)}
                        onChange={(e) => { setSearchTerm(e.target.value); setIsActive(true); }}
                    />
                </div>

                {isActive && searchTerm && (
                    <div className="absolute mt-2 w-full bg-custom-radial rounded shadow-lg z-10 border border-white border-opacity-30 max-h-72 overflow-y-auto">
                        {courses.map((suggestion, index) => (
                            <div onClick={() => {
                                addUserCourse(suggestion)
                                setIsActive(false)
                                setSearchTerm('')
                            }} tabIndex={index} autoFocus={index === 0} key={suggestion.id} className="p-4 border-b border-white border-opacity-30 last:border-b-0 hover:bg-default overflow-hidden text-ellipsis whitespace-nowrap">
                                {suggestion.id} - {suggestion.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default SearchBar;
