# frozen_string_literal: true

# :reek:UncommunicativeModuleName: disable
module Api
  module V1
    class TopicsController < ApiController
      before_action :set_topic, only: %i[show update destroy]

      def index
        render_topics(Topic.all)
      end

      def show
        render_topics(@topic)
      end

      def create
        @topic = Topic.new(topic_params)

        if @topic.save
          render_topics(@topic, :created)
        else
          render json: @topic.errors, status: :unprocessable_entity
        end
      end

      def update
        if @topic.update(topic_params)
          render_topics(@topic)
        else
          render json: @topic.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @topic.destroy
        head :no_content
      end

      private

      def set_topic
        @topic = Topic.find(params[:id])
      end

      def topic_params
        params.require(:data).permit(:id, :type, attributes: [:name]).fetch(:attributes, [])
      end

      def render_topics(topics, status = :ok)
        render status, json: ::TopicSerializer.new(topics)
      end

      def render_topics(topics, status = :ok)
        render status, json: ::TopicSerializer.new(topics)
      end
    end
  end
end
# :reek:UncommunicativeModuleName: enable
