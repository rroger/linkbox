# frozen_string_literal: true

topic_1 = seed_once(Topic, name: 'Typography')
topic_2 = seed_once(Topic, name: 'Design Principles')
topic_3 = seed_once(Topic, name: 'Sketch')
topic_4 = seed_once(Topic, name: 'UI Elements')
topic_5 = seed_once(Topic, name: 'Information Architechture')
topic_6 = seed_once(Topic, name: 'Design Systems')
topic_7 = seed_once(Topic, name: 'Desing Masters')
topic_8 = seed_once(Topic, name: 'Copywritting')
topic_9 = seed_once(Topic, name: 'Icons')

seed_once(Link, title: 'flexbox', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', notes: 'Recommendation', topic: topic_4)
seed_once(Link, title: 'css tricks', url: 'https://css-tricks.com/', notes: 'Hint', topic: topic_4)
seed_once(Link, title: 'Example 1', url: 'https://example1.com', notes: '', topic: topic_1)
seed_once(Link, title: 'Example 2', url: 'https://example2.com', notes: '', topic: topic_3)
seed_once(Link, title: 'Example 3', url: 'https://example3.com', notes: '', topic: topic_6)
seed_once(Link, title: 'Example 4', url: 'https://example4.com', notes: '', topic: topic_5)
seed_once(Link, title: 'Example 5', url: 'https://example5.com', notes: '', topic: topic_6)

seed_once(Link, title: 'flexbox', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', notes: 'Some other notes', topic: topic_4, completed: true)
seed_once(Link, title: 'css tricks', url: 'https://css-tricks.com/', notes: 'Hint of Andres', topic: topic_4, completed: true)
seed_once(Link, title: 'Example 6', url: 'https://example6.com', notes: '', topic: topic_1, completed: true)
seed_once(Link, title: 'Example 7', url: 'https://example7.com', notes: '', topic: topic_3, completed: true)
seed_once(Link, title: 'Example 8', url: 'https://example8.com', notes: 'More Notes', topic: topic_6, completed: true)
seed_once(Link, title: 'Example 9', url: 'https://example9.com', notes: '', topic: topic_5, completed: true)
seed_once(Link, title: 'Example 10', url: 'https://example10.com', notes: '', topic: topic_6, completed: true)
