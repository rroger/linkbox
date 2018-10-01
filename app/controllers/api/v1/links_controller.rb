# frozen_string_literal: true

module Api
  module V1
    class LinksController < ApplicationController
      before_action :set_api_v1_link, only: %i[show edit update destroy]

      # GET /api/v1/links
      # GET /api/v1/links.json
      def index
        @api_v1_links = Api::V1::Link.all
      end

      # GET /api/v1/links/1
      # GET /api/v1/links/1.json
      def show; end

      # GET /api/v1/links/new
      def new
        @api_v1_link = Api::V1::Link.new
      end

      # GET /api/v1/links/1/edit
      def edit; end

      # POST /api/v1/links
      # POST /api/v1/links.json
      def create
        @api_v1_link = Api::V1::Link.new(api_v1_link_params)

        respond_to do |format|
          if @api_v1_link.save
            format.html { redirect_to @api_v1_link, notice: 'Link was successfully created.' }
            format.json { render :show, status: :created, location: @api_v1_link }
          else
            format.html { render :new }
            format.json { render json: @api_v1_link.errors, status: :unprocessable_entity }
          end
        end
      end

      # PATCH/PUT /api/v1/links/1
      # PATCH/PUT /api/v1/links/1.json
      def update
        respond_to do |format|
          if @api_v1_link.update(api_v1_link_params)
            format.html { redirect_to @api_v1_link, notice: 'Link was successfully updated.' }
            format.json { render :show, status: :ok, location: @api_v1_link }
          else
            format.html { render :edit }
            format.json { render json: @api_v1_link.errors, status: :unprocessable_entity }
          end
        end
      end

      # DELETE /api/v1/links/1
      # DELETE /api/v1/links/1.json
      def destroy
        @api_v1_link.destroy
        respond_to do |format|
          format.html { redirect_to api_v1_links_url, notice: 'Link was successfully destroyed.' }
          format.json { head :no_content }
        end
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_api_v1_link
        @api_v1_link = Api::V1::Link.find(params[:id])
      end

      # Never trust parameters from the scary internet, only allow the white list through.
      def api_v1_link_params
        params.require(:api_v1_link).permit(:topic_id, :url, :title, :notes)
      end
    end
  end
end
