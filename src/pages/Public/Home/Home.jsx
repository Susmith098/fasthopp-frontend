import React from 'react'
import { Link } from 'react-router-dom';
import Header from '../../../components/Public/Header/Header';
import Footer from '../../../components/Public/Footer/Footer';
import selectionImage from '../../../assets/images/selection.svg';
import scrumBoard from '../../../assets/images/scrum_board.svg';
import assignee from '../../../assets/images/assign.svg';
import Done from '../../../assets/images/Done.svg';
import message from '../../../assets/images/message.svg';
import virtualMeet from '../../../assets/images/virtual_meets.svg';

export default function Home() {
    return (
        <div>
            <Header />

            <div className="mx-auto w-full max-w-7xl">
                <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-2 sm:py-16">
                    <div className="relative z-10 max-w-screen-xl px-4  pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
                        <div className="max-w-xl sm:mt-1 mt-80 space-y-8 text-center sm:text-right sm:ml-auto">
                            <h2 className="text-4xl font-bold sm:text-5xl">
                                Fasthopp is a faster way of managing your tasks.
                                <br />
                                <br />
                                <span className="hidden sm:block text-4xl">Join today</span>
                            </h2>

                            <Link
                                className="inline-flex text-white items-center px-6 py-3 font-medium bg-orange-700 rounded-lg hover:opacity-75"
                                to="/register"
                            >
                                &nbsp; Get Started
                            </Link>
                        </div>
                    </div>

                    <div className="absolute inset-0 w-full sm:my-20 sm:pt-1 pt-12 h-full ">
                        <img className="w-96" src={selectionImage} alt="image1" />
                    </div>
                </aside>

                <section class="overflow-hidden">
                    <div class="mx-auto max-w-5xl px-5 py-24">
                        <div class="mx-auto flex flex-wrap items-center lg:w-4/5">
                            <div class="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
                                <h2 class="text-sm font-semibold tracking-widest text-gray-500">
                                    Assignee
                                </h2>
                                <h1 class="my-4 text-3xl font-semibold text-black">You can assign tasks to members of your Kanban board.</h1>
                                
                                <p class="leading-relaxed">
                                The assignee can see tasks and update cards. Interact with other assignees with inbuilt chat.
                                </p>
                            </div>
                            <img
                                alt="Nike Air Max 21A"
                                class="h-64 w-full rounded object-cover lg:h-96 lg:w-1/2"
                                src={assignee}
                            />
                        </div>
                    </div>
                </section>

                <section class="overflow-hidden">
                    <div class="mx-auto max-w-5xl px-5 py-24">
                        <div class="mx-auto flex flex-wrap items-center lg:w-4/5">
                            <img
                                alt="Nike Air Max 21A"
                                class="h-64 w-full rounded object-cover lg:h-96 lg:w-1/2"
                                src={Done}
                            />
                            <div class="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
                                <h2 class="text-sm font-semibold tracking-widest text-gray-500">
                                    Done
                                </h2>
                                <h1 class="my-4 text-3xl font-semibold text-black">After completing each task, you can put a card in done.</h1>
                                
                                <p class="leading-relaxed">
                                You and your assignees can get tasks done.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="overflow-hidden">
                    <div class="mx-auto max-w-5xl px-5 py-24">
                        <div class="mx-auto flex flex-wrap items-center lg:w-4/5">
                            <div class="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
                                <h2 class="text-sm font-semibold tracking-widest text-gray-500">
                                    Meeting
                                </h2>
                                <h1 class="my-4 text-3xl font-semibold text-black">Intuitive virtual meeting experience.</h1>
                                
                                <p class="leading-relaxed">
                                Meeting with your assignees and chatting in meetings helps you be productive.
                                </p>
                            </div>
                            <img
                                alt="Nike Air Max 21A"
                                class="h-64 w-full rounded object-cover lg:h-96 lg:w-1/2"
                                src={virtualMeet}
                            />
                        </div>
                    </div>
                </section>

                <section class="overflow-hidden">
                    <div class="mx-auto max-w-5xl px-5 py-24">
                        <div class="mx-auto flex flex-wrap items-center lg:w-4/5">
                            <img
                                alt="Nike Air Max 21A"
                                class="h-64 w-full rounded object-cover lg:h-96 lg:w-1/2"
                                src={message}
                            />
                            <div class="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
                                <h2 class="text-sm font-semibold tracking-widest text-gray-500">
                                    Comment
                                </h2>
                                <h1 class="my-4 text-3xl font-semibold text-black">Comment with your queries in cards.</h1>
                                
                                <p class="leading-relaxed">
                                    Your assignees can stay updated with your comments on task updates and issues.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="grid  place-items-center sm:mt-20">
                    <img className="w-96" src={scrumBoard} alt="image1" />
                </div>

                <h1 className="text-center text-2xl sm:text-5xl py-10 font-medium">With Fasthop Kanban Board, get started easily with your tasks.</h1>
            </div>
            <Footer />
        </div>
    );
}