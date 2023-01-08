// import { TriviaRequestProps } from '../../components/Trivia/TriviaQuestion'
import GetTriviaQuestions from '../../src/API'

describe('Trivia Question component Mock tests', () => {
  test('Mocking Trivia API', async () => {
    //arrange
    const fakeResponse = [
      {
        category: 'Entertainment: Video Games',
        id: '1',
        correctAnswer: 'Mario',
        incorrectAnswers: ['Luigi', 'Peach', 'Bowser'],
        question: 'Who is the main character of the Super Mario series?',
        tags: ['mario', 'nintendo', 'plumber', 'super mario'],
        type: 'multiple',
        difficulty: 'easy',
        isNiche: false,
      },
    ]

    // let props: TriviaRequestProps = { limit: 1 }

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeResponse),
      })
    ) as jest.Mock

    //act
    const result = await GetTriviaQuestions(props)

    //assert
    expect(result.length).toBe(props.limit)

    expect(result).toEqual(fakeResponse)
  })
})
